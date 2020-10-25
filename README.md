# Tech Assignment

A project to create update statements based on a JSON document.

## Getting Started

### Prerequisites

To run this project you need NodeJS + NPM installed in your machine.

### Installation

1 - Clone the repo
```sh
git clone https://github.com/diegobcaetano/tech-assignment.git
```
2 - Install NPM packages
```sh
npm install
```

## Usage

The method **_generateUpdateStatement_** can be tested using the following command:

```sh
npm test
```

You can find all the tests written in this file _test/GenerateStatement.test.ts_ and, the original document used for the tests is in _test/Stubs/OriginalDocument.json_

## Considerations

1 - When the sub-document has others sub-documents the algorithm traverses to the deepest sub-document to look for the updates. Therefore, any updates that could have in the other levels will be ignored. This could be an update for a real version.

> For example if you have a sub-document posts and, it has a sub-document mentions. if you try to update a property in the post and add a new mention in the same mutation, the update on the post object will be ignored.