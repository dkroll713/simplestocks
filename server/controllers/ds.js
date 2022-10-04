
const TrieNode = function() {
  this.children = {};
  this.isWord = false;
}

const Trie = function(end = false, value = '') {
  this.root = new TrieNode();
}

Trie.prototype.insert = function(word, node = this.root) {
  // debugger;
  for (const char of word) {
      const child = node.children[char] || new TrieNode();
      node.children[char] = child;
      node = child;
  }
  node.isWord = true;
}

Trie.prototype.getAllWords = function(node = this.root) {
  let words = [];
  let root = node.children;
  const getWord = (top, word = '') => {
      // console.log(top)
      for (const key in top) {
          let priorWord = word;
          word += key
          if (top[key]) {
              if (!top[key].isWord) {
                  let children = top[key].children;
                  getWord(children, word)
              } else {
                  words.push(word)
                  let children = top[key].children;
                  getWord(children, word)
              }
          }
          word = priorWord
      }
  }
  getWord(root)
  return words
}

Trie.prototype.search = function(word, node = this.root) {
  let result = '';
  for (const char of word) {
      const child = node.children[char] || null;
      result += char;
      if (!child) {
          return false
      }
      node = child;
  }
  console.log(result)
  return node.isWord
}

Trie.prototype.startsWith = function(prefix, node = this.root) {
  for (const char of prefix) {
      const child = node.children[char] || null;
      if (!child) return false
      node = child;
  }
  return true;
}


module.exports.createTrie = (data) => {
  console.log(data);
  let trie = new Trie();
  data.map(row => {
    trie.insert(row.ticker);
  })
  const tickers = trie.getAllWords();
  return tickers;
}