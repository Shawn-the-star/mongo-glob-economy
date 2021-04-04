const { Database } = require('quickmongo');
const Discord = require('discord.js')
var url

class Economy {

    /** 
     * @param {string} dbUrl - Mongo Database URL 
     */

    static async setURL(dbUrl) {
        if (!dbUrl) throw new TypeError('Mongo Database URL was not provided');

        return url = dbUrl
    }

    /**
     * @param {string} userID - ID of the target
     */

    static async findUser(userID) {
        if (!userID) throw new TypeError('userID was not provided');

        const db = new Database(url);
        const user = await db.fetch(userID)

        if (!userID) return false
        if (user) return true
    }

    /**
     * @param {string} userID - ID of the target
     */

    static async createProfile(userID) {
        if (!userID) throw new TypeError('userID was not provided');

        const db = new Database(url);
        const user = await db.fetch(userID)

        if (user) throw new TypeError('The userID alredy exists in the Database')

        if (!user) {
            await db.set(`${userID}.coins`, 0)
            await db.set(`${userID}.bank`, 0)
            await db.set(`${userID}.banklimit`, 1000)
        }
    }

    /**
     * @param {string} userID - ID of the target
     */

    static async deleteProfile(userID) {
        if (!userID) throw new TypeError('userID was not provided');

        const db = new Database(url);
        const user = await db.fetch(userID)

        if (!user) throw new TypeError('The userID does not exist in the Database');

        if (user) {
            db.delete(userID);
        }
    }

    /**
     * @param {string} userID - ID of the target
     */


    static async getCoinsInWallet(userID) {
        if (!userID) throw new TypeError('userID was not provided');

        const db = new Database(url);
        const user = await db.fetch(userID)

        if (!user) throw new TypeError('The userID does not exist in the Database');

        return await db.get(`${userID}.coins`);
    }

    /**
     * @param {string} userID - ID of the target
     */


    static async getCoinsInBank(userID) {
        if (!userID) throw new TypeError('userID was not provided');

        const db = new Database(url);
        const user = await db.fetch(userID)

        if (!user) throw new TypeError('The userID does not exist in the Database');

        return await db.get(`${userID}.bank`);
    }


    /**
     * 
     * @param {string} userID - ID of the target 
     */


    static async getBankLimit(userID) {
        if (!userID) throw new TypeError('userID was not provided');

        const db = new Database(url);
        const user = await db.fetch(userID)

        if (!user) throw new TypeError('The userID does not exist in the Database');

        return await db.get(`${userID}.banklimit`);
    }

    /**
     * 
     * @param {string} userID - ID of the target
     * @param {Number} coins - amount to add
     */

    static async incCoinsInWallet(userID, coins) {
        if (!userID) throw new TypeError('userID was not provided');
        if (!coins) throw new TypeError('The amount of coinst to add was not provided')
        if (isNaN(coins)) throw new TypeError('The coins must be Numbers')
        if (coins < 1) throw new RangeError('The value of coins must be positive')

        const db = new Database(url);
        const user = await db.fetch(userID)

        if (!user) throw new TypeError('The userID does not exist in the Database');

        return db.add(`${userID}.coins`, coins)
    }

    /**
     * 
     * @param {string} userID - ID of the target
     * @param {Number} coins - amount to add
     */

    static async incCoinsInBank(userID, coins) {
        if (!userID) throw new TypeError('userID was not provided');
        if (!coins) throw new TypeError('The amount of coinst to add was not provided')
        if (isNaN(coins)) throw new TypeError('The coins must be Numbers')
        if (coins < 1) throw new RangeError('The value of coins must be positive')

        const db = new Database(url);
        const user = await db.fetch(userID)

        if (!user) throw new TypeError('The userID does not exist in the Database');

        return db.add(`${userID}.bank`, coins)
    }

    /**
     * 
     * @param {string} userID - ID of the target
     * @param {Number} value - amount to add
     */

    static async incBankLimit(userID, coins) {
        if (!userID) throw new TypeError('userID was not provided');
        if (!coins) throw new TypeError('The amount of coinst to add was not provided')
        if (isNaN(coins)) throw new TypeError('The coins must be Numbers')
        if (coins < 1) throw new RangeError('The value of coins must be positive')

        const db = new Database(url);
        const user = await db.fetch(userID)

        if (!user) throw new TypeError('The userID does not exist in the Database');

        return db.add(`${userID}.banklimit`, value)
    }

    /**
     * 
     * @param {string} userID - ID of the target
     * @param {Number} coins - amount to remove
     */

    static async decCoinsInWallet(userID, coins) {
        if (!userID) throw new TypeError('userID was not provided');
        if (!coins) throw new TypeError('The amount of coinst to add was not provided')
        if (isNaN(coins)) throw new TypeError('The coins must be Numbers')
        if (coins < 1) throw new RangeError('The value of coins must be positive')

        const db = new Database(url);
        const user = await db.fetch(userID)

        if (!user) throw new TypeError('The userID does not exist in the Database');

        return db.subtract(`${userID}.coins`, coins)
    }

    /**
     * 
     * @param {string} userID - ID of the target
     * @param {Number} coins - amount to remove
     */

    static async decCoinsInBank(userID, coins) {
        if (!userID) throw new TypeError('userID was not provided');
        if (!coins) throw new TypeError('The amount of coinst to add was not provided')
        if (isNaN(coins)) throw new TypeError('The coins must be Numbers')
        if (coins < 1) throw new RangeError('The value of coins must be positive')

        const db = new Database(url);
        const user = await db.fetch(userID)

        if (!user) throw new TypeError('The userID does not exist in the Database');

        return db.subtract(`${userID}.bank`, coins)
    }

    /**
     * 
     * @param {string} userID - ID of the target
     * @param {Number} value - amount to remove
     */

    static async decBankLimit(userID, coins) {
        if (!userID) throw new TypeError('userID was not provided');
        if (!coins) throw new TypeError('The amount of coinst to add was not provided')
        if (isNaN(coins)) throw new TypeError('The coins must be Numbers')
        if (coins < 1) throw new RangeError('The value of coins must be positive')

        const db = new Database(url);
        const user = await db.fetch(userID)

        if (!user) throw new TypeError('The userID does not exist in the Database');

        return db.subtract(`${userID}.banklimit`, value)
    }
}

module.exports = Economy
