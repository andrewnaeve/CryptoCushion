const {
	GraphQLSchema,
	GraphQLNonNull,
	GraphQLObjectType,
	GraphQLInputObjectType,
	GraphQLList,
	GraphQLString,
	GraphQLInt,
	GraphQLFloat,
	GraphQLID,
	GraphQLBoolean
} = require('graphql');

exports.Schema = schema => {
	return new GraphQLSchema(schema);
};
exports.NonNull = type => {
	return new GraphQLNonNull(type);
};
exports.ObjectType = object => {
	return new GraphQLObjectType(object);
};
exports.InputObjectType = object => {
	return new GraphQLInputObjectType(object);
};
exports.List = list => {
	return new GraphQLList(list);
};
exports.String = GraphQLString;
exports.Int = GraphQLInt;
exports.Float = GraphQLFloat;
exports.ID = GraphQLID;
exports.Boolean = GraphQLBoolean;
