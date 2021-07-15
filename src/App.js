import "./App.css";
import React from "react";

class Sort extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "Bubble",
      list: [64, 34, 25, 12, 22, 11, 90],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  // Bubble sort
  swap = (arr, xp, yp) => {
    let temp = arr[xp];
    arr[xp] = arr[yp];
    arr[yp] = temp;
  };
  bubbleSort = (arr, n) => {
    let i, j;
    for (i = 0; i < n - 1; i++) {
      for (j = 0; j < n - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          this.swap(arr, j, j + 1);
        }
      }
    }
  };
  // Merge Sort
  merge(arr, l, m, r) {
    let n1 = m - l + 1;
    let n2 = r - m;
    let L = new Array(n1);
    let R = new Array(n2);

    for (let i = 0; i < n1; i++) L[i] = arr[l + i];
    for (let j = 0; j < n2; j++) R[j] = arr[m + 1 + j];

    // Merge the temp arrays back into arr[l..r]
    // Initial index of first subarray
    let i = 0;

    // Initial index of second subarray
    let j = 0;

    // Initial index of merged subarray
    let k = l;

    while (i < n1 && j < n2) {
      if (L[i] <= R[j]) {
        arr[k] = L[i];
        i++;
      } else {
        arr[k] = R[j];
        j++;
      }
      k++;
    }

    while (i < n1) {
      arr[k] = L[i];
      i++;
      k++;
    }

    while (j < n2) {
      arr[k] = R[j];
      j++;
      k++;
    }
  }

  mergeSort(arr, l, r) {
    if (l >= r) {
      return; //returns recursively
    }
    let m = l + parseInt((r - l) / 2);
    this.mergeSort(arr, l, m);
    this.mergeSort(arr, m + 1, r);
    this.merge(arr, l, m, r);
  }

  //Quick sort
  swap_qick(items, leftIndex, rightIndex) {
    var temp = items[leftIndex];
    items[leftIndex] = items[rightIndex];
    items[rightIndex] = temp;
  }
  partition(items, left, right) {
    var pivot = items[Math.floor((right + left) / 2)], //middle element
      i = left, //left
      j = right; //right
    while (i <= j) {
      while (items[i] < pivot) {
        i++;
      }
      while (items[j] > pivot) {
        j--;
      }
      if (i <= j) {
        this.swap_qick(items, i, j); //sawpping two elements
        i++;
        j--;
      }
    }
    return i;
  }

  quickSort(items, left, right) {
    var index;
    if (items.length > 1) {
      index = this.partition(items, left, right); //index returned from partition
      if (left < index - 1) {
        //more elements on the left side of the pivot
        this.quickSort(items, left, index - 1);
      }
      if (index < right) {
        //more elements on the right side of the pivot
        this.quickSort(items, index, right);
      }
    }
    return items;
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    if (this.state.value === "Bubble") {
      this.bubbleSort(this.state.list, this.state.list.length);
      alert(
        "Sorted array with " + this.state.value + " Sort: " + this.state.list
      );
    } else if (this.state.value === "Merge") {
      this.mergeSort(this.state.list, 0, this.state.list.length - 1);
      alert(
        "Sorted array with " + this.state.value + " Sort: " + this.state.list
      );
    } else if (this.state.value === "Quick") {
      this.quickSort(this.state.list, 0, this.state.list.length - 1);
      alert(
        "Sorted array with " + this.state.value + " Sort: " + this.state.list
      );
    }

    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          <h1>Array is: {this.state.list.join(",")}</h1>
          Pick a sorting algorithm:
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="Merge">Merge Sort</option>
            <option value="Quick">Quick Sort</option>
            <option value="Bubble">Bubble Sort</option>
            <option value="Insertion">Insertion Sort</option>
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default Sort;
