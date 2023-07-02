import React from 'react'

const url = 'https://cdn.pixabay.com/photo/2018/08/21/23/29/forest-3622519_640.jpg'

export const Card = ({card}) => {

  if (card?.flow === 'left') return (
    <div className='grid grid-cols-2 rounded-primary overflow-hidden bg-slate-100 shadow '>
      <img src={url} alt="" className='aspect-video' />
      <div className='p-4'>
        <p className='font-body'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam non minus ea aliquid fuga vero ex pariatur tempore, autem officiis veritatis atque dicta iusto recusandae explicabo cumque voluptatem, maxime nihil tenetur, iste reprehenderit laudantium. Quos error repellat sunt cupiditate placeat ducimus sit ipsum iusto! Necessitatibus neque eos, in et, ullam itaque excepturi magni obcaecati blanditiis adipisci sed? Deserunt eum architecto quaerat iusto illum, obcaecati nam, aut, iure beatae nesciunt ipsa deleniti ab sed optio rem fuga animi quo. Voluptate at sint pariatur debitis inventore modi dolor dolorum, sed est adipisci beatae quos ipsa iure repellendus sapiente accusantium quasi fuga aliquid.
        </p>
      </div>
    </div>
  )

  return (
    <div className='grid grid-cols-2 rounded-primary overflow-hidden bg-slate-100 shadow '>
      <div className='p-4'>
        <p className='font-body'>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officiis, nisi delectus itaque consectetur deleniti, autem quam magni aspernatur architecto repellat iure, assumenda expedita velit explicabo obcaecati numquam eius laborum unde maxime iusto. Pariatur consequuntur odio saepe voluptate illo quis laborum temporibus tempore, reprehenderit soluta veritatis doloremque consequatur. Iusto, aut nesciunt earum nostrum enim dolores assumenda. Molestias optio veniam, ab minus quis repellat amet modi suscipit esse cumque sint minima odio, iure eius inventore. Aspernatur maiores delectus fuga? Quidem officiis ut qui accusantium dicta provident exercitationem, facilis, odio quos alias quo nisi veritatis illo aliquam, magni non vel incidunt quam quis.
        </p>
      </div>
      <img src={url} alt="" className='aspect-video' />
    </div>
  )
}
