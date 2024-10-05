const fs = require('fs/promises');
const jwt = require('jsonwebtoken');

const findUser = async (email) => {
    const data = await fs.readFile('./src/resources/comptes.txt', 'utf8');

    const users = data.split('\n');
    const user = users.find(u => u.startsWith(`${email}`));

    if (user) {
        const values = user.split('###');
        return {
            email: values[0],
            password: ''+values[1],
            walletAddress: values[2],
            privateKey: values[3]
        };
    } else {
        return null;
    }
}

const createUser = async (email, password, wallet) => {
    const newUser = `${email}###${password}###${wallet.address}###${wallet.privateKey}\n`;

    await fs.appendFile('./src/resources/comptes.txt', newUser, 'utf-8');
}

module.exports = {
    findUser: findUser,
    createUser: createUser
};