import { Locations, Attractions } from '../data'

import {
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema
} from 'graphql'

const ForecastType = new GraphQLObjectType({
  name: 'Forecast',
  description: 'This represents a forecast',
  fields: () => ({
    date: {type: new GraphQLNonNull(GraphQLString)},
    day: {type: new GraphQLNonNull(GraphQLString)},
    high: {type: new GraphQLNonNull(GraphQLString)},
    low: {type: new GraphQLNonNull(GraphQLString)},
    text: {type: new GraphQLNonNull(GraphQLString)}
  })
})

const LocationType = new GraphQLObjectType({
  name: 'Location',
  description: 'This represents a location',
  fields: () => ({
    id: {type: new GraphQLNonNull(GraphQLString)},
    name: {type: new GraphQLNonNull(GraphQLString)},
    forecast: {
      type: new GraphQLList(ForecastType),
      resolve: ({ zipCode }, args, { Weather }) => {
        return Weather.getTenDaysForecase(zipCode)
          .then(results => {
            return results
          })
      }
    }
  })
})

const AttractionType = new GraphQLObjectType({
  name: 'Attraction',
  description: 'This represents an attraction',
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
