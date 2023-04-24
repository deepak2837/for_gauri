const User = require('../models/userModel');

const getFilteredUsers = async (req, res) => {
  const { criteria } = req.query;
  let filter = {};

  switch (criteria) {
    case '1':
      filter = { $and: [{ income: { $lt: '$5 USD' } }, { car: { $in: ['BMW', 'Mercedes'] } }] };
      break;
    case '2':
      filter = { $and: [{ gender: 'Male' }, { phone_price: { $gt: '10000' } }] };
      break;
    case '3':
      filter = { $and: [{ last_name: /^M/ }, { $expr: { $gt: [{ $strLenCP: '$quote' }, 15] } }, { email: { $regex: /M$/ } }] };
      break;
    case '4':
      filter = { $and: [{ car: { $in: ['BMW', 'Mercedes', 'Audi'] } }, { email: { $not: /[\d]/ } }] };
      break;
    case '5':
      filter = [
        { $group: { _id: '$city', count: { $sum: 1 }, income: { $avg: { $convert: { input: '$income', to: 'double' } } } } },
        { $sort: { count: -1 } },
        { $limit: 10 }
      ];
      break;
    default:
      filter = {};
  }

  try {
    const data = await User.aggregate(filter);
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { getFilteredUsers };
