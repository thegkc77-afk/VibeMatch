const express =
    require("express");

const router =
    express.Router();

const auth =
    require(
        "../middleware/authMiddleware"
    );

const {
    updateLocation,
    getNearbyUsers,
} = require(
    "../controllers/userController"
);

router.put(
    "/location",
    auth,
    updateLocation
);

router.get(
    "/nearby",
    auth,
    getNearbyUsers
);

module.exports =
    router;