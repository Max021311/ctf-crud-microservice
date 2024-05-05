import models from './../models'
import lazyLoad from './../common/lazy-load'
import EntryOfSaleService from './entry-of-sale'
import ProductService from './product'
import SaleService from './sale-service'
import EmpleadoService from './empleado'
import JobTitleService from './job-title'
import MaterialService from './material'
import RouteService from './route'
import StallOfRouteService from './stall-of-route'

export type ServiceParams = {
  models: () => typeof models,
  services: typeof Services
}
const serviceParams = {
  models: lazyLoad(() => models)
} as ServiceParams

const Services = {
  config: lazyLoad((config: ServiceParams) => config, serviceParams),
  entryOfSale: lazyLoad((params: ServiceParams) => new EntryOfSaleService(params), serviceParams),
  product: lazyLoad((params: ServiceParams) => new ProductService(params), serviceParams),
  sale: lazyLoad((params: ServiceParams) => new SaleService(params), serviceParams),
  empleado: lazyLoad((params: ServiceParams) => new EmpleadoService(params), serviceParams),
  jobTitle: lazyLoad((params: ServiceParams) => new JobTitleService(params), serviceParams),
  material: lazyLoad((params: ServiceParams) => new MaterialService(params), serviceParams),
  route: lazyLoad((params: ServiceParams) => new RouteService(params), serviceParams),
  stallOfRoute: lazyLoad((params: ServiceParams) => new StallOfRouteService(params), serviceParams)
}

serviceParams.services = Services

export default Services
