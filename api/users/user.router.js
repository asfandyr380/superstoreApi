const { 
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
    login
} = require('./user.controller');
const router = require('express').Router();
const { checkToken } = require('../../auth/token_validation');

router.post('/', createUser);
router.get('/', getUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.post('/login', login);

module.exports = router;