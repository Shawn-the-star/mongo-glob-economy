# What is 'mongo-glob-economy'

It is a global economy package that allows you to create, delete, edit data for the user and much more

# Why mongo-glob-economy?

- Easy to use
- Uses mongo databases which are encrypted
- Provides a global economy system
- Has a bank system
- Has a bank limit

# Setting up

Here is the basic code to connect to your mongo database

```js
const { setUrl } = require("mongo-glob-economy"); //requireing the package

setUrl("mongodb://localhost/quickmongo"); //The mongo database url
```

but instead of `mongodb://localhost/quickmongo` you would provide your actual mongo database url

# Examples

_Examples assume that you have setted up the module as presented in 'Setting Up' section._
_Following examples assume that your `Discord.Client` is called `client`._

_Following examples assume that your `client.on("message", message` is called `message`._

_Following example contains isolated code which you need to integrate in your own command handler._

_Following example assumes that you are able to write asynchronous code (use `await`)._

- **Increasing the value of bank limit by a bit each time the author sends a message**

```js
const { findUser, createProfile, incBankLimit } = require("mongo-glob-economy");

client.on("message", async (message) => {
  if (!message.guild) return;
  if (message.author.bot) return;

  const randomValue = Math.floor(Math.random() * 9) + 1; // Min 1, Max 10
  const user = await findUser(message.author.id);
  if (!user) return await createProfile(message.author.id); //using this function to create the profile if one dosnt have 1 alredy

  if (user) return await incBankLimit(message.author.id, randomValue); //using the function to inc bank limit
});
```

- **Bal command**

```js
const {
  findUser,
  getCoinsInWallet,
  getCoinsInBank,
  getBankLimit,
} = require("mongo-glob-economy");
const Discord = require("discord.js");

//from here starts the actual code
const target = message.mentions.members.first() || message.member;
const user = await findUser(target.id);

if (!user) return message.channel.send("You dont have a profile");

const coins = await getCoinsInWallet(target.id);
const bankCoins = await getCoinsInBank(target.id);
const bankLimit = await getBankLimit(target.id);

const embed = new Discord.MessageEmbed().setTitle("Balance").addFields(
  {
    name: "wallet",
    value: coins,
  },
  {
    name: "bank",
    value: bankCoins + "/" + bankLimit,
  }
);

message.channel.send(embed);
```

_Time for you to get creative_

# Functions

**setUrl**

```js
setUrl(<dbUrl: string>);
```

This is used to connect to the database

**findUser**

```js
findUser(<userID: string>);
```

This is used to find if there is an entry in the db for a certain user

**createProfile**

```js
createProfile(<userID: string>);
```

This is used to create a profile if the user dosnt have one alredy

**deleteProfile**

```js
deleteProfile(<userID: string>)
```

This is used to delete profile of the user if they have one

**getCoinsInWallet**

```js
getCoinsInWallet(<userID: string>)
```

This is used to get the value of coins for the target

**incCoinsInWallet**

```js
incCoinsInWallet(<userID: string>, <coins: Number>)
```

This is used to increase the value of coins for the target

**decCoinsInWallet**

```js
decCoinsInWallet(<userID: string>, <coins: Number>)
```

This is used to decrease the value of coins for the target

**getCoinsInBank**

```js
getCoinsInBank(<userID: string>)
```

This is used to get the value of bank for the target

**incCoinsInBank**

```js
incCoinsInBank(<userID: string>, <coins: Number>)
```

This is used to increase the value of bank for the target

**decCoinsInBank**

```js
decCoinsInBank(<userID: string>, <coins: Number>)
```

This is used to decrease the value of bank for the target

**getBankLimit**

```js
getBankLimit(<userID: string>)
```

This is used to get the value of banklimit for the target

**incBankLimit**

```js
incBankLimit(<userID: string>, <value: Number>)
```

This is used to increase the value of banklimit for the target

**decBankLimit**

```js
decBankLimit(<userID: string>, <value: Number>)
```

This is used to decrease the value of banklimit for the target
