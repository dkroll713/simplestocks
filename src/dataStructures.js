const TrieNode = function() {
  this.children = {};
  this.isWord = false;
  this.parent = null;
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

getAllWords = function(node = this.root) {
  let words = [];
  let root = node.children;
  // console.log(root);
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

getAllWordsStartingWith = function(input, node = this.root) {
  let starting = input;
  let words = [];
  // console.log(node);
  let root = node.children;
  input = input.split('');
  // console.log(root);
  if (input.length > 0) {
      while (input.length > 0) {
          if (!root.children) {
              root = root[input[0]];
          } else if (root.children) {
              root = root.children[input[0]];
          }
          input.splice(0, 1);
          if (!root) return [];
      }

      words = getAllWords(root);
      // if (root.isWord) words.unshift(starting)
      for (let x = 0; x < words.length; x++) {
          let word = words[x];
          // console.log(word);
          words[x] = starting + word
      }
  }

  return words;
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

module.exports.getAllWords = getAllWords;
module.exports.getAllWordsStartingWith = getAllWordsStartingWith;