import { SendHorizonal } from 'lucide-react';

function Contact() {
  return (
    <div className='backdrop-blur-xs h-screen text-white p-8'>
      <h2 className='font-semibold text-center'>Contact Us</h2>
      <p className='text-center'>
        If you have any questions or feedback, feel free to reach out!
      </p>
      <div className='mt-8 place-items-center'>
        <form
          className='max-w-md mx-auto p-4 border rounded-lg space-y-4'
          method='POST'
        >
          <div className='leading-7 flex flex-col'>
            <label htmlFor='name' className='leading-7'>
              Name:
            </label>
            <input
              type='text'
              id='name'
              name='name'
              className='border-b-2 focus:outline-none focus:border-indigo-500 px-1 py-0.5'
              required
            />
          </div>
          <div className='leading-7 flex flex-col'>
            <label htmlFor='email'>Email:</label>
            <input
              type='email'
              id='email'
              name='email'
              className='border-b-2 focus:outline-none focus:border-indigo-500 px-1 py-0.5'
              required
            />
          </div>
          <div className='w-full leading-7'>
            <label htmlFor='message'>Message:</label>
            <textarea
              id='message'
              name='message'
              className='w-full border-2 rounded-md focus:outline-none focus:border-indigo-500 px-1 py-0.5 h-32'
              required
            ></textarea>
          </div>
          <button type='submit' className='bg-indigo-600 group p-2 inline-flex items-center gap-2 text-white rounded-md hover:bg-indigo-700 transition-all duration-200'>
            Send
            <SendHorizonal size={18} className='group-hover:-rotate-25 duration-200'/>
          </button>
        </form>
        <p className='mt-5'>We will get back to you as soon as possible!</p>
      </div>
      <footer>
        <p className='text-center mt-8 text-sm'>
          © {new Date().getFullYear()} Ashutosh Gajjar. All rights reserved.
        </p>

      </footer>
    </div>
  );
}

export default Contact;
