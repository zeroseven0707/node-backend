const { parseBody } = require('../utils/parseBody');
const { success, json } = require('../core/response');

const userController = {
  index: (req, res) => {
    const users = [{ id: 1, name: 'Sihab' }];
    success(res, users, 'User list fetched');
  },

  create: async (req, res) => {
    try {
      const data = await parseBody(req);

      if (!data.name) {
        return json(res, 400, { success: false, message: 'Name is required' });
      }

      const user = { id: Date.now(), name: data.name };
      success(res, user, `User ${data.name} created`);
    } catch (err) {
      json(res, 500, { success: false, message: 'Invalid JSON' });
    }
  }
};

module.exports = { userController };
