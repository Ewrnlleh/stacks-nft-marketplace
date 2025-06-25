;; Stacks NFT Marketplace Contract
;; This contract manages NFT minting, listing, purchasing, and bidding

;; Constants
(define-constant contract-owner tx-sender)
(define-constant err-owner-only (err u100))
(define-constant err-not-found (err u101))
(define-constant err-not-authorized (err u102))
(define-constant err-already-listed (err u103))
(define-constant err-not-listed (err u104))
(define-constant err-insufficient-payment (err u105))
(define-constant err-invalid-bid (err u106))
(define-constant err-bid-expired (err u107))

;; NFT Definition
(define-non-fungible-token stacks-nft uint)

;; Data Variables
(define-data-var next-token-id uint u1)
(define-data-var marketplace-fee uint u250) ;; 2.5%

;; Data Maps
(define-map nft-metadata uint {
  name: (string-ascii 64),
  description: (string-ascii 256),
  image: (string-ascii 256),
  creator: principal,
  royalty-percentage: uint
})

(define-map listings uint {
  seller: principal,
  price: uint,
  active: bool
})

(define-map bids uint {
  bidder: principal,
  amount: uint,
  expires-at: uint,
  active: bool
})

(define-map user-stats principal {
  nfts-created: uint,
  nfts-owned: uint,
  total-sales: uint,
  total-purchases: uint
})

;; Public Functions

;; Mint a new NFT
(define-public (mint-nft (name (string-ascii 64)) 
                        (description (string-ascii 256)) 
                        (image (string-ascii 256))
                        (royalty-percentage uint))
  (let ((token-id (var-get next-token-id)))
    (asserts! (<= royalty-percentage u1000) (err u108)) ;; Max 10% royalty
    (try! (nft-mint? stacks-nft token-id tx-sender))
    (map-set nft-metadata token-id {
      name: name,
      description: description,
      image: image,
      creator: tx-sender,
      royalty-percentage: royalty-percentage
    })
    (update-user-stats tx-sender "created")
    (var-set next-token-id (+ token-id u1))
    (ok token-id)
  )
)

;; List NFT for sale
(define-public (list-nft (token-id uint) (price uint))
  (let ((owner (unwrap! (nft-get-owner? stacks-nft token-id) err-not-found)))
    (asserts! (is-eq tx-sender owner) err-not-authorized)
    (asserts! (> price u0) (err u109))
    (asserts! (is-none (map-get? listings token-id)) err-already-listed)
    (map-set listings token-id {
      seller: tx-sender,
      price: price,
      active: true
    })
    (ok true)
  )
)

;; Remove NFT from listing
(define-public (unlist-nft (token-id uint))
  (let ((listing (unwrap! (map-get? listings token-id) err-not-listed)))
    (asserts! (is-eq tx-sender (get seller listing)) err-not-authorized)
    (map-delete listings token-id)
    (ok true)
  )
)

;; Purchase NFT
(define-public (purchase-nft (token-id uint))
  (let (
    (listing (unwrap! (map-get? listings token-id) err-not-listed))
    (price (get price listing))
    (seller (get seller listing))
    (metadata (unwrap! (map-get? nft-metadata token-id) err-not-found))
    (creator (get creator metadata))
    (royalty-percentage (get royalty-percentage metadata))
    (marketplace-fee-amount (/ (* price (var-get marketplace-fee)) u10000))
    (royalty-amount (/ (* price royalty-percentage) u10000))
    (seller-amount (- (- price marketplace-fee-amount) royalty-amount))
  )
    (asserts! (get active listing) err-not-listed)
    (asserts! (not (is-eq tx-sender seller)) (err u110))
    
    ;; Transfer STX payments
    (try! (stx-transfer? seller-amount tx-sender seller))
    (try! (stx-transfer? royalty-amount tx-sender creator))
    (try! (stx-transfer? marketplace-fee-amount tx-sender contract-owner))
    
    ;; Transfer NFT
    (try! (nft-transfer? stacks-nft token-id seller tx-sender))
    
    ;; Update listing and stats
    (map-delete listings token-id)
    (update-user-stats seller "sold")
    (update-user-stats tx-sender "purchased")
    
    (ok true)
  )
)

;; Place bid on NFT
(define-public (place-bid (token-id uint) (amount uint) (expires-at uint))
  (begin
    (asserts! (> amount u0) err-invalid-bid)
    (asserts! (> expires-at block-height) err-invalid-bid)
    (asserts! (is-some (nft-get-owner? stacks-nft token-id)) err-not-found)
    
    ;; Cancel any existing active bid from this user
    (match (map-get? bids token-id)
      existing-bid (if (and (is-eq (get bidder existing-bid) tx-sender) (get active existing-bid))
                      (map-set bids token-id (merge existing-bid { active: false }))
                      true)
      true
    )
    
    ;; Place new bid
    (map-set bids token-id {
      bidder: tx-sender,
      amount: amount,
      expires-at: expires-at,
      active: true
    })
    (ok true)
  )
)

;; Accept bid
(define-public (accept-bid (token-id uint))
  (let (
    (bid (unwrap! (map-get? bids token-id) err-not-found))
    (owner (unwrap! (nft-get-owner? stacks-nft token-id) err-not-found))
    (bidder (get bidder bid))
    (amount (get amount bid))
    (metadata (unwrap! (map-get? nft-metadata token-id) err-not-found))
    (creator (get creator metadata))
    (royalty-percentage (get royalty-percentage metadata))
    (marketplace-fee-amount (/ (* amount (var-get marketplace-fee)) u10000))
    (royalty-amount (/ (* amount royalty-percentage) u10000))
    (seller-amount (- (- amount marketplace-fee-amount) royalty-amount))
  )
    (asserts! (is-eq tx-sender owner) err-not-authorized)
    (asserts! (get active bid) err-not-found)
    (asserts! (<= block-height (get expires-at bid)) err-bid-expired)
    
    ;; Transfer STX payments
    (try! (stx-transfer? seller-amount bidder tx-sender))
    (try! (stx-transfer? royalty-amount bidder creator))
    (try! (stx-transfer? marketplace-fee-amount bidder contract-owner))
    
    ;; Transfer NFT
    (try! (nft-transfer? stacks-nft token-id tx-sender bidder))
    
    ;; Update maps and stats
    (map-delete bids token-id)
    (map-delete listings token-id)
    (update-user-stats tx-sender "sold")
    (update-user-stats bidder "purchased")
    
    (ok true)
  )
)

;; Read-only functions

(define-read-only (get-nft-metadata (token-id uint))
  (map-get? nft-metadata token-id)
)

(define-read-only (get-listing (token-id uint))
  (map-get? listings token-id)
)

(define-read-only (get-bid (token-id uint))
  (map-get? bids token-id)
)

(define-read-only (get-user-stats (user principal))
  (default-to 
    { nfts-created: u0, nfts-owned: u0, total-sales: u0, total-purchases: u0 }
    (map-get? user-stats user)
  )
)

(define-read-only (get-next-token-id)
  (var-get next-token-id)
)

(define-read-only (get-marketplace-fee)
  (var-get marketplace-fee)
)

;; Private functions

(define-private (update-user-stats (user principal) (action (string-ascii 16)))
  (let ((current-stats (get-user-stats user)))
    (if (is-eq action "created")
      (map-set user-stats user (merge current-stats { 
        nfts-created: (+ (get nfts-created current-stats) u1),
        nfts-owned: (+ (get nfts-owned current-stats) u1)
      }))
      (if (is-eq action "sold")
        (map-set user-stats user (merge current-stats { 
          total-sales: (+ (get total-sales current-stats) u1),
          nfts-owned: (- (get nfts-owned current-stats) u1)
        }))
        (if (is-eq action "purchased")
          (map-set user-stats user (merge current-stats { 
            total-purchases: (+ (get total-purchases current-stats) u1),
            nfts-owned: (+ (get nfts-owned current-stats) u1)
          }))
          false
        )
      )
    )
  )
)

;; Admin functions

(define-public (set-marketplace-fee (new-fee uint))
  (begin
    (asserts! (is-eq tx-sender contract-owner) err-owner-only)
    (asserts! (<= new-fee u1000) (err u111)) ;; Max 10% fee
    (var-set marketplace-fee new-fee)
    (ok true)
  )
)
