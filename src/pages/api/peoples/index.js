import dbConnect from '../../../services/mongoDb';
import People from '../../../models/People';

dbConnect();

export default async function handler(req, res) {
  const {method } = req;

  switch (method) {
    case 'GET':
      try {
        const people = await People.find({});
        res.status(200).json({success: true, data: people});

      } catch (error) {
        console.error(error);
        res.status(500).json({success: false, error});
      }
    break;
    case 'POST':
      try {
        const { name, skills } = req.body;

        if (!name && !skills) throw 'Invalid data';

        const people = await People.create({name, skills});
        res.status(201).json({success: true , data: people});

      } catch (error) {
        console.error(error);
        res.status(500).json({success: false, error});
      }
    break;
  }
}
