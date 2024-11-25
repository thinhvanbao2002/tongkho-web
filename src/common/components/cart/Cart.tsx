function CartComponent({ data }: any) {
  return (
    <>
      <div className='bg-baseBackground shadow-lg rounded-xl overflow-hidden'>
        <img
          src='https://bizweb.dktcdn.net/100/415/697/products/ak058.png?v=1701405312903'
          alt='Product'
          className='w-full h-64 object-cover'
        />
        <div className='p-4'>
          <h2 className='text-lg font-semibold mb-2'>{data.name}</h2>
          <p className='mt-4 text-xl font-bold text-primary'>{data.price}đ</p>
        </div>
        <div className='p-4 flex justify-between items-center border-t border-gray-200'>
          <button className='text-white bg-blue-500 bg-black text-while hover:bg-money px-4 py-2 rounded-lg transform transition-all'>
            Mua ngay
          </button>
          <button className='text-white bg-blue-500 bg-black text-while hover:bg-money px-4 py-2 rounded-lg transform transition-all'>
            <svg className='w-6' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 576 512' fill='#fff'>
              <path d='M0 24C0 10.7 10.7 0 24 0L69.5 0c22 0 41.5 12.8 50.6 32l411 0c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3l-288.5 0 5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5L488 336c13.3 0 24 10.7 24 24s-10.7 24-24 24l-288.3 0c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5L24 48C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z' />
            </svg>
          </button>
        </div>
      </div>
    </>
  )
}

export default CartComponent
