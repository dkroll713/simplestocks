package main

import (
	"fmt"
)

type TrieNode struct {
	children map[string]TrieNode
	isWord   bool
}

type Trie struct {
	root TrieNode
}

func createTrie() Trie {
	children := make(map[string]TrieNode)
	trieNode := TrieNode{children: children, isWord: false}
	trie := Trie{root: trieNode}
	return trie
}

func (trie *Trie) insert(word string, node *TrieNode) TrieNode {
	fmt.Printf("inserting word %s into trie\n", word)
	original := *node
	length := len(word)
	// fmt.Println("length:", length)
	// char := string(word[0])
	// fmt.Println(char)
	// newNode := TrieNode{}
	// node.children[char] = newNode
	// node = &newNode
	for i := 0; i < length; i++ {

		// isolate char
		char := string(word[i])
		child := TrieNode{}
		if i == length-1 {
			child = TrieNode{isWord: true}
		}
		// fmt.Printf("\nchecking if node %s exists already\n", char)
		// fmt.Println("current node:", node)
		test, ok := node.children[char]
		// if ok {
		// 	child = test
		// }
		if ok {
			// fmt.Println(char, " children exist:")
			child = test
			if i == length-1 {
				child.isWord = true
			}
		} else {
			// fmt.Println(i, "index", char, " children does not exist")
			child.children = make(map[string]TrieNode)
		}
		// initialize a new trie node

		if node.children == nil {
			node.children = make(map[string]TrieNode)
			node.children[char] = child
		} else {
			node.children[char] = child
		}
		// node.children[char] = newNode
		// fmt.Println("node:", node)
		// fmt.Println("char:", char, "child:", child)
		node = &child
		// fmt.Println("final node:", node, "\n")

	}
	return original
}

func (trie *Trie) getAllWords() []string {
	var words []string
	root := trie.root.children
	words = getWord(root, "", words)
	// fmt.Println("unsorted words:", words)
	words = sortWords(words)
	// fmt.Println("sorted words:", words)
	return words
}

func getWord(top map[string]TrieNode, wordSoFar string, words []string) []string {
	for key, element := range top {
		priorWord := wordSoFar
		wordSoFar := wordSoFar + key
		if element.isWord {
			// fmt.Println("Key:", key, "=> element:", element)
			// fmt.Println("word so far:", wordSoFar)
			words = append(words, wordSoFar)
		}
		words = getWord(element.children, wordSoFar, words)
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

func (trie *Trie) getAllWordsStartingWith(input string) []string {
	var words []string
	root := trie.root.children
	for i := 0; i < len(input); i++ {
		char := string(input[i])
		// fmt.Println(char)
		root = root[char].children
	}

	// fmt.Println(root)
	words = getWord(root, input, words)
	words = sortWords(words)
	return words
}

func main() {
	trie := createTrie()
	// fmt.Println("beginning trie:", trie)
	trie.root = trie.insert("help", &trie.root)
	trie.root = trie.insert("hello", &trie.root)
	trie.root = trie.insert("hella", &trie.root)
	trie.root = trie.insert("holla", &trie.root)
	trie.root = trie.insert("aa", &trie.root)
	trie.root = trie.insert("he", &trie.root)
	trie.root = trie.insert("abcde", &trie.root)
	trie.root = trie.insert("abcdef", &trie.root)
	trie.root = trie.insert("abb", &trie.root)
	trie.root = trie.insert("abcd", &trie.root)
	trie.root = trie.insert("ab", &trie.root)
	// fmt.Println("\nending trie:", trie.root, "\n")

	fmt.Println("words in trie:", trie.getAllWords())

	fmt.Println("words starting with h:", trie.getAllWordsStartingWith("h"))
	fmt.Println("words starting with hel:", trie.getAllWordsStartingWith("hel"))
	fmt.Println("words starting with ab:", trie.getAllWordsStartingWith("ab"))
}
