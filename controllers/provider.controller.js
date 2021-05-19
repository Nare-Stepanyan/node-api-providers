const { providers } = require("./../models/schemas");

class ProviderController {
  create = async (req, res, next) => {
    try {
      const providerData = {
        name: req.body.name,
      };
      await providers.countDocuments(
        { name: providerData.name },
        async (err, count) => {
          if (count === 0) {
            const newProvider = await providers.create(providerData);
            res.send(newProvider);
          } else {
            err = { message: "Such provider already exists" };
            res.send(err.message);
          }
        }
      );
    } catch (err) {
      next(err);
    }
  };

  get = async (req, res, next) => {
    try {
      await providers.find({}, function (err, result) {
        if (err) {
          res.send(err);
        } else {
          res.send(result);
        }
      });
    } catch (err) {
      next(err);
    }
  };

  delete = async (req, res, next) => {
    try {
      const provider = await providers.findOneAndDelete({
        _id: req.params.id,
      });

      if (!provider) throw error;
      res.json({ success: true });
    } catch (err) {
      next(err);
    }
  };

  update = async (req, res, next) => {
    try {
      const provider = await providers.findOne({
        _id: req.params.id,
      });
      if (!provider) throw error;
      req.body.name && (provider.name = req.body.name);
      await provider.save();
      res.json(provider.toObject());
    } catch (err) {
      next(err);
    }
  };
}

module.exports = new ProviderController();
