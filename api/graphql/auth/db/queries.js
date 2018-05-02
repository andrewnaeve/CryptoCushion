const bcrypt = require('bcrypt')
const User = require('./models')

const hashPassword = plainText => {
  const saltRounds = 10
  return bcrypt.hash(plainText, saltRounds)
}

const retrieveUserHashByEmail = email => {
  return new User({ email: email })
    .fetch()
    .then(result => {
      if (result) {
        return {
          password: result.get('password'),
          id: result.get('id')
        }
      } else {
        return result
      }
    })
    .catch(e => e.code)
}

exports.saveUser = (first_name, last_name, email, password) => {
  return hashPassword(password).then(hash => {
    return User.forge({
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: hash
    })
      .save()
      .then(result => {
        return {
          result: 'success',
          id: result.get('id'),
          email: result.get('email')
        }
      })
      .catch(e => {
        return {
          result: e.code
        }
      })
  })
}

exports.comparePassword = (email, plainText) => {
  return retrieveUserHashByEmail(email).then(data => {
    if (data) {
      return {
        result: bcrypt.compare(plainText, data.password),
        id: data.id
      }
    } else {
      return {
        result: false,
        id: null
      }
    }
  })
}
