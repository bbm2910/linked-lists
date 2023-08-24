class Node {
    constructor(value) {
        this.value = value;
        this.nextNode = null;
    }
}

class LinkedList {
    constructor() {
        this.headNode = null;
        this.tail = null;
    }

    append(value) {
        const newNode = new Node(value);

        if (!this.headNode) {
            // If the list is empty, make the new node both the head and tail.
            this.headNode = newNode;
            this.tail = newNode;
        } else {
            // Otherwise, add the new node to the end of the list and update the tail.
            this.tail.nextNode = newNode;
            this.tail = newNode;
        }
    }

    prepend(value) {
        const newNode = new Node(value);

        if (!this.headNode) {
            // If the list is empty, set both head and tail to the new node.
            this.headNode = newNode;
            this.tail = newNode;
        } else {
            // If the list is not empty, set the new node's nextNode to the current head
            // and update the head to the new node.
            newNode.nextNode = this.headNode;
            this.headNode = newNode;
        }
    }

    size() {
        let count = 0;
        let current = this.headNode;

        while (current !== null) {
            count++;
            current = current.nextNode;
        }

        return count;
    }

    returnHead() {
        if (this.headNode) {
            return this.headNode;
        } else {
            return null; // Return null if the list is empty
        }
    }
    returnTail() {
        if (this.tail) {
            return this.tail;
        } else {
            return null; // Return null if the list is empty
        }
    }

    at(index) {
        if (index < 0 || index >= this.size()) {
            return null;
        }

        let count = 0;
        let current = this.headNode;

        while (count < index && current !== null) {
            current = current.nextNode;
            count++;
        }
        return current;
    }

    pop() {
        if (!this.headNode) {
            // List is empty, nothing to pop
            return null;
        }
        if (this.headNode === this.tail) {
            // List has only one element, remove it
            const removedNode = this.head;
            this.headNode = null;
            this.tail = null;
            return removedNode;
        }
        let current = this.headNode;
        let previous = null;

        while (current.nextNode !== null) {
            previous = current;
            current = current.nextNode;
        }

        // Set the tail to the previous node, effectively removing the last node
        this.tail = previous;
        if (previous) {
            previous.nextNode = null;
        }
        return current;
    }

    contains(value) {
        let current = this.headNode;

        while (current !== null) {
            if (current.value === value) {
                return true;
            }
            current = current.nextNode;
        }
        return false;
    }

    find(value) {
        let current = this.headNode;
        let index = 0;

        while (current !== null) {
            if (current.value === value) {
                return index;
            }
            current = current.nextNode;
            index++;
        }
        return null; // Value not found
    }

    toString() {
        let result = "";
        let current = this.headNode;

        while (current !== null) {
            result += `(${current.value}) -> `;
            current = current.nextNode;
        }

        result += "null";
        return result;
    }

    insertAt(value, index) {
        if (index < 0 || index > this.size()) {
            // Index is out of bounds
            return false;
        }

        const newNode = new Node(value);
        if (index === 0) {
            // Insert at the beginning
            newNode.nextNode = this.headNode;
            this.headNode = newNode;

            if (!this.tail) {
                this.tail = newNode;
            }
        } else {
            // Insert at a non-beginning position
            const previousNode = this.at(index - 1);
            newNode.nextNode = previousNode.nextNode;
            previousNode.nextNode = newNode;

            if (index === this.size()) {
                // If inserting at the end, update the tail
                this.tail = newNode;
            }
        }
        return true; // Node inserted successfully
    }

    removeAt(index) {
        if (index < 0 || index >= this.size()) {
            // Index is out of bounds
            return null;
        }

        if (index === 0) {
            // Remove the node at the beginning
            const removedNode = this.headNode;
            this.headNode = this.headNode.nextNode;

            if (this.size() === 1) {
                // If the list had only one element, update the tail
                this.tail = null;
            }

            return removedNode;
        }

        const previousNode = this.at(index - 1);
        const removedNode = previousNode.nextNode;
        previousNode.nextNode = removedNode.nextNode;

        if (index === this.size() - 1) {
            // If removing the last node, update the tail
            this.tail = previousNode;
        }
        return removedNode;
    }
}

const myList = new LinkedList();

myList.append(2); //Append a node
myList.prepend(1); //Prepend a node
myList.append(3);
myList.append(4);
myList.size(); //Get the size of the list

const myFirstNode = myList.returnHead();
const myLastNode = myList.returnTail();

console.log(myList); //Log the list - head and tail
console.log(`My list size is: ${myList.size()}`); //Log the size of the list
console.log(myFirstNode); //Log the first node
console.log(myLastNode); //Log the last node

const nodeAtIndex = myList.at(1); //Returns the node at a certain index
console.log(`Node at index: ${nodeAtIndex.value}`);

const removedNode = myList.pop(); // Removes and returns the node with value 3
console.log(`Node at index ${removedNode.value + 1} removed`);

const valueContained = myList.contains(2);
console.log(valueContained); //True for 2
const valueContained2 = myList.contains(7);
console.log(valueContained2); //False for 7

const findValue = myList.find(3); //Returns the node where the value is
console.log(findValue);

const listString = myList.toString(); //Show the nodes as strings
console.log(listString);

const valueInserted = myList.insertAt(70, 2);
const valueInserted2 = myList.insertAt(44, 1);
const valueInserted3 = myList.insertAt(100, 5);
const valueInserted4 = myList.insertAt(20, 6);
console.log(myList.toString()); //Check if the new values are inserted

const deleteNodeAtIndex = myList.removeAt(1); // Removes the node at index 1
console.log(myList.toString());  //Check if the node was deleted
console.log(deleteNodeAtIndex.value);  //Show the value of the deleted node