import { Locations, Attractions } from '../data'

import {
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema
} from 'graphql'

const LocationType = new GraphQLObjectType({
  name: 'Location',
  description: 'This represent a location',
  fields: () => ({
    id: {type: new GraphQLNonNull(GraphQLString)},
    name: {type: new GraphQLNonNull(GraphQLString)}
  })
})

const AttractionType = new GraphQLObjectType({
  name: 'Attraction',
  description: 'This represent an attraction',
  fields: () => ({
    id: {type: new GraphQLNonNull(GraphQLString)},
    name: {type: new GraphQLNonNull(GraphQLString)},
    location: {
      type: LocationType,
      resolve: (attraction) => {
        return Locations.find(location => {
          return location.id === attraction.locationId
        })
      }
    }
  })
})

const QueryRootType = new GraphQLObjectType({
  name: 'QueryRoot',
  description: 'Blog Application Schema Query Root',
  fields: () => ({
    locations: {
      type: new GraphQLList(LocationType),
      description: 'List of all Locations',
      resolve: () => {
        return Locations
      }
    },
    attractions: {
      type: new GraphQLList(AttractionType),
      description: 'List of all Attractions',
      resolve: () => {
        return Attractions
      }
    }
  })
})

const AppSchema = new GraphQLSchema({
  query: QueryRootType
})

export default AppSchema
