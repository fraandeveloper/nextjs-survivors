import dbConnect from '../../../services/mongoDb';
import People from '../../../models/People';

dbConnect();

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  switch (method) {
    case 'PUT':
      try {
        const { name, skills } = req.body;

        if (!name && !skills) throw 'Invalid data';

        await People.updateOne({_id: id}, {name, skills});
        res.status(200).json({ success: true });

      } catch (error) {
        console.error(error);
        res.status(500).json({success: false, error});
      }
    break;
    case 'DELETE':
      try {
        await People.deleteOne({_id: id});
        res.status(201).json({ success: true });

      } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error });
      }
    break;
  }
}
