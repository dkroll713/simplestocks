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
	fmt.Println("unsorted words:", words)
	words = sortWords(words)
	fmt.Println("sorted words:", words)
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
	sorted := false
	for !sorted {
		sorted = true
		for word := range words {
			if word >= 0 && word < len(words)-1 {
				length1 := len(words[word])
				length2 := len(words[word+1])
				var longest int
				var shorter string
				if length1 >= length2 {
					longest = length2
					shorter = words[word+1]
				} else {
					longest = length1
					shorter = words[word]
				}
				fmt.Println(words[word][0] == words[word+1][0])
				if words[word][0] == words[word+1][0] {
					// compare letter by letter
					for i := 0; i < longest; i++ {
						fmt.Println(words[word], words[word][i], words[word+1], words[word+1][i], words[word][i] > words[word+1][i])
						if words[word][i] > words[word+1][i] && length2 <= length1 {
							fmt.Println("swapping", words[word], "with", words[word+1])
							tmp := words[word+1]
							words[word+1] = words[word]
							words[word] = tmp
							sorted = false
						}
					}
				}
				fmt.Println(shorter)
				if words[word][0] > words[word+1][0] {
					tmp := words[word+1]
					words[word+1] = words[word]
					words[word] = tmp
					sorted = false
				}
			}
		}
	}

	return words
}

func main() {
	trie := createTrie()
	fmt.Println("beginning trie:", trie)

	trie.root = trie.insert("help", &trie.root)
	trie.root = trie.insert("hello", &trie.root)
	trie.root = trie.insert("hella", &trie.root)
	trie.root = trie.insert("aa", &trie.root)
	trie.root = trie.insert("he", &trie.root)
	trie.root = trie.insert("abcde", &trie.root)
	trie.root = trie.insert("abcdef", &trie.root)
	trie.root = trie.insert("abb", &trie.root)
	trie.root = trie.insert("abcd", &trie.root)
	trie.root = trie.insert("ab", &trie.root)
	fmt.Println("\nending trie:", trie.root, "\n")

	fmt.Println("words in trie:", trie.getAllWords())
}
