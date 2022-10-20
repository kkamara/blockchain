const log = require('log-beautify')
const SHA256 = require('crypto-js/sha256')

class Block {
  constructor(index, timestamp, data, previousHash='') {
    this.index = index
    this.timestamp = timestamp
    this.data = data
    this.previousHash = previousHash
    this.hash = ''
    this.hash = this.calculateHash()
  }

  calculateHash() {
    return SHA256(
      this.index + 
      this.previousHash + 
      this.timestamp + 
      JSON.stringify(this.data).toString()
    )
  }
}

class BlockChain{
  constructor() {
    this.chain = [this.createGenesisBlock()]
  }

  createGenesisBlock() {
    return new Block (0, '01/01/2022', 'Genesis Block', 0)
  }

  getPreviousBlock() {
    return this.chain[this.chain.length - 1]
  }

  addBlock(newBlock) {
    newBlock.previousHash = this.getPreviousBlock().hash
    newBlock.hash = newBlock.calculateHash()
    this.chain.push(newBlock)
  }
}

let newCoin = new BlockChain()

newCoin.addBlock(new Block(1, '23/01/2022', { amount: 200, }))
newCoin.addBlock(new Block(1, '15/02/2022', { amount: 100, }))

log.success(JSON.stringify(newCoin))
