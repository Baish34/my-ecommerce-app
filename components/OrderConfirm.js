import Header from './Header'
import {Link} from 'react-router-dom'

const OrderConfirm = ()=>{
  return (<>
    <Header/>
    <div className='container py-4'>
      <h2>Thank you for your order!</h2>
      <p>Your order has been placed successfully. </p>
      <Link to="/cart" className='btn btn-primary'>Back to Cart</Link>
    </div>
    </>);

}
 export default OrderConfirm