const User =
    require("../models/User");

exports.updateLocation =
    async (req, res) => {
        const {
            latitude,
            longitude,
        } = req.body;

        await User.findByIdAndUpdate(
            req.user.id,
            {
                location: {
                    type: "Point",
                    coordinates: [
                        longitude,
                        latitude,
                    ],
                },
            }
        );

        res.json({
            message:
                "Location Updated",
        });
    };

exports.getNearbyUsers =
    async (req, res) => {
        const {
            latitude,
            longitude,
        } = req.query;

        const users =
            await User.find({
                location: {
                    $near: {
                        $geometry: {
                            type: "Point",
                            coordinates: [
                                Number(
                                    longitude
                                ),
                                Number(
                                    latitude
                                ),
                            ],
                        },
                        $maxDistance:
                            5000,
                    },
                },
            }).select(
                "-password"
            );

        res.json(users);
    };