import express from 'express'

import {
    getAllProperties,
    getPropertiesDetail,
    createProperty,
    updateProperty,
    deleteProperty
} from '../controllers/property.controllers.js'

const propertyRouter = express.Router();

propertyRouter.route('/').get(getAllProperties)
propertyRouter.route('/:id').get(getPropertiesDetail)
propertyRouter.route('/').post( createProperty)
propertyRouter.route('/:id').patch(updateProperty)
propertyRouter.route('/:id').delete(deleteProperty)

export default propertyRouter;