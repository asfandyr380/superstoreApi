const { 
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
    login,
    loginWithGoogle,
    forgotPassword,
    byEmail,
    updateVerify,
} = require('./user.controller');
const router = require('express').Router();
const { checkToken } = require('../../auth/token_validation');

router.post('/', createUser);
router.get('/', getUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.post('/login', login);
router.post('/getUser', byEmail);
router.put('/verify/:id', updateVerify);
router.post('/forgotPass/:id', forgotPassword);
router.post('/loginWithGoogle', loginWithGoogle);

module.exports = router;