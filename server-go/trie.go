package main

type TrieNode struct {
	children map[string]any
	isWord   bool
}

type Trie struct {
	root TrieNode
}

// func (trie *Trie) insert {
// fmt.Println(trie)
// }
