import {generateUpdateStatement} from "../src";
// @ts-ignore
import originalDocument from "./Stubs/OriginalDocument.json";

test('Test Update Statement', () => {
    const statementList = generateUpdateStatement(originalDocument, {
        friends: [
            {
                _id: "5f959d1266fcb1f3470c41dc",
                name: "New Name"
            },
            {
                _id: "5f959d1211e3bf83c6287a08",
                posts: [{
                    _id: "5f959d120d494d973b98b951",
                    title: "New Title"
                }]
            }]
    });

    expect(Array.isArray(statementList)).toBe(true);
    expect(statementList[0]).toMatchObject({$update: {"friends.1.name": "New Name"}});
    expect(statementList[1]).toMatchObject({$update: {"friends.0.posts.1.title": "New Title"}});
});

test('Test Delete Statement', () => {
    const statementList = generateUpdateStatement(originalDocument, {
        friends: [
            {
                _id: "5f959d12c92afcfbb3bd3a05",
                posts: [{
                    _id: "5f959d1285bcd22df6abcfb4",
                    title: "New Title",
                    _delete: true
                }]
            }],
        groups: [
            {
                _id: "5f959d129ceb8829d6cf8520",
                _delete: true
            }
        ]
    });

    expect(Array.isArray(statementList)).toBe(true);
    expect(statementList[0]).toMatchObject({$delete: {"friends.2.posts.1": true}});
    expect(statementList[1]).toMatchObject({$delete: {'groups.1': true}});
});

test('Test Add Statement', () => {
    const statementList = generateUpdateStatement(originalDocument, {
        friends: [
            {
                _id: "5f959d1211e3bf83c6287a08",
                posts: [{
                    title: "Lorem adipisicing sint"
                }]
            }],
        groups: [
            {
                name: "duis"
            }
        ]
    });

    expect(Array.isArray(statementList)).toBe(true);
    expect(statementList[0]).toMatchObject({$add: {"friends.0.posts": [{"title": "Lorem adipisicing sint"}]}});
    expect(statementList[1]).toMatchObject({$add: {"groups": [{"name": "duis"}]}});
});

test('Combined Statements', () => {
    const statementList = generateUpdateStatement(originalDocument, {
        friends: [
            {
                _id: "5f959d1211e3bf83c6287a08",
                posts: [{
                    title: "Lorem adipisicing sint"
                }]
            },
            {
                _id: "5f959d1211e3bf83c6287a08",
                posts: [{
                    _id: "5f959d129f70135026ff87d1",
                    title: "Updating this title"
                }]
            },
            {
                _id: "5f959d1211e3bf83c6287a08",
                posts: [{
                    _id: "5f959d120d494d973b98b951",
                    _delete: true
                }]
            }
        ]
    });

    expect(Array.isArray(statementList)).toBe(true);
    expect(statementList[0]).toMatchObject({$add: {"friends.0.posts": [{"title": "Lorem adipisicing sint"}]}});
    expect(statementList[1]).toMatchObject({$update: {"friends.0.posts.2.title": "Updating this title"}});
    expect(statementList[2]).toMatchObject({$delete: {"friends.0.posts.1": true}});
});

test('Test when ID passed in mutation does not match any document', () => {
    const statementList = generateUpdateStatement(originalDocument, {
        friends: [
            {
                _id: "fakeId",
                posts: [{
                    title: "Lorem adipisicing sint"
                }]
            }]
    });

    expect(Array.isArray(statementList)).toBe(true);
    expect(statementList).toHaveLength(0);
});