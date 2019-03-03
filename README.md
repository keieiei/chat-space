# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

#DB設計

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|index: true,null: false, foreign_key: true|
|mail|string|null: false|

### Association
- has_many : groups through members
- has_many : members
- has_many : messages

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|index: true,null: false, foreign_key: true|

### Association
- has_many : users through members
- has_many : members
- has_many : messages

## membersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user


## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|body|text|index: true,null: false, foreign_key: true|
|image|string|null: true|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user
