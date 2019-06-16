import db from "../utils/db";

export default (name) => {
	return db.select('id').from('organization').where({
		name,
	}).limit(1);
};
