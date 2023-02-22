package trie

// package main

import (
	"fmt"
)

type TrieNode struct {
	Children map[string]TrieNode `json:"children"`
	IsWord   bool                `json:"isWord"`
}

type Trie struct {
	Root TrieNode `json:"root"`
}

func CreateTrie() Trie {
	children := make(map[string]TrieNode)
	trieNode := TrieNode{Children: children, IsWord: false}
	trie := Trie{Root: trieNode}
	return trie
}

func (trie *Trie) Insert(word string, node *TrieNode) TrieNode {
	// fmt.Printf("inserting word %s into trie\n", word)
	original := *node
	length := len(word)
	for i := 0; i < length; i++ {

		// isolate char
		char := string(word[i])
		child := TrieNode{}
		if i == length-1 {
			child = TrieNode{IsWord: true}
		}
		test, ok := node.Children[char]
		// if ok {
		// 	child = test
		// }
		if ok {
			// fmt.Println(char, " children exist:")
			child = test
			if i == length-1 {
				child.IsWord = true
			}
		} else {
			// fmt.Println(i, "index", char, " children does not exist")
			child.Children = make(map[string]TrieNode)
		}
		// initialize a new trie node

		if node.Children == nil {
			node.Children = make(map[string]TrieNode)
			node.Children[char] = child
		} else {
			node.Children[char] = child
		}
		node = &child

	}
	return original
}

func (trie *Trie) GetAllWords() []string {
	var words []string
	root := trie.Root.Children
	words = getWord(root, "", words)
	words = sortWords(words)
	return words
}

func getWord(top map[string]TrieNode, wordSoFar string, words []string) []string {
	for key, element := range top {
		priorWord := wordSoFar
		wordSoFar := wordSoFar + key
		if element.IsWord {
			words = append(words, wordSoFar)
		}
		words = getWord(element.Children, wordSoFar, words)
		wordSoFar = priorWord
	}
	return words
}

func sortWords(words []string) []string {
	for i := 0; i < len(words); i++ {
		for j := i + 1; j < len(words); j++ {
			if words[i] > words[j] {
				temp := words[i]
				words[i] = words[j]
				words[j] = temp
			}
		}
	}

	return words
}

func (trie *Trie) GetAllWordsStartingWith(input string) []string {
	var words []string
	root := trie.Root.Children
	for i := 0; i < len(input); i++ {
		char := string(input[i])
		root = root[char].Children
	}

	words = getWord(root, input, words)
	words = sortWords(words)
	return words
}

func main() {
	trie := CreateTrie()
	trie.Root = trie.Insert("help", &trie.Root)
	trie.Root = trie.Insert("hello", &trie.Root)
	trie.Root = trie.Insert("hella", &trie.Root)
	trie.Root = trie.Insert("holla", &trie.Root)
	trie.Root = trie.Insert("aa", &trie.Root)
	trie.Root = trie.Insert("he", &trie.Root)
	trie.Root = trie.Insert("abcde", &trie.Root)
	trie.Root = trie.Insert("abcdef", &trie.Root)
	trie.Root = trie.Insert("abb", &trie.Root)
	trie.Root = trie.Insert("abcd", &trie.Root)
	trie.Root = trie.Insert("ab", &trie.Root)
	// fmt.Println("\nending trie:", trie.root, "\n")

	fmt.Println("words in trie:", trie.GetAllWords())

	fmt.Println("words starting with h:", trie.GetAllWordsStartingWith("h"))
	fmt.Println("words starting with hel:", trie.GetAllWordsStartingWith("hel"))
	fmt.Println("words starting with ab:", trie.GetAllWordsStartingWith("ab"))
}
