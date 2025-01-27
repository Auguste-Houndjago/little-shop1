// 'use server';

// import { PrismaClient } from '@prisma/client';
// import { getServerSession } from 'next-auth';
// import { authOptions } from '@/lib/auth';

// const prisma = new PrismaClient();

// export async function addProductComment(productId: string, comment: string) {
//   try {
//     const session = await getServerSession(authOptions);
    
//     if (!session || !session.user) {
//       throw new Error('You must be logged in to comment');
//     }

//     const newComment = await prisma.review.create({
//       data: {
//         productId,
//         userId: session.user.id,
//         comment,
//         rating: 0 // Optional: default rating
//       }
//     });

//     return newComment;
//   } catch (error) {
//     console.error('Error adding comment:', error);
//     throw error;
//   }
// }

// export async function fetchProductComments(productId: string) {
//   try {
//     const comments = await prisma.review.findMany({
//       where: { productId },
//       include: {
//         user: {
//           select: {
//             name: true,
//             email: true
//           }
//         }
//       },
//       orderBy: {
//         createdAt: 'desc'
//       }
//     });

//     return comments;
//   } catch (error) {
//     console.error('Error fetching comments:', error);
//     throw error;
//   }
// }


// "use client"

// import React, { useState, useEffect } from 'react';
// import { addProductComment, fetchProductComments } from '@/app/(home)/products/_actions/comment-actions';
// import { toast } from 'sonner';

// interface Comment {
//   id: string;
//   comment: string;
//   createdAt: string;
//   user: {
//     name: string | null;
//     email: string | null;
//   };
// }

// const Chat = ({ productId }: { productId: string }) => {
//   const [comment, setComment] = useState('');
//   const [comments, setComments] = useState<Comment[]>([]);

//   useEffect(() => {
//     const loadComments = async () => {
//       try {
//         const fetchedComments = await fetchProductComments(productId);
//         setComments(fetchedComments);
//       } catch (error) {
//         toast.error('Failed to load comments');
//       }
//     };

//     loadComments();
//   }, [productId]);

//   const handleSubmitComment = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (!comment.trim()) {
//       toast.error('Comment cannot be empty');
//       return;
//     }

//     try {
//       const newComment = await addProductComment(productId, comment);
//       setComments([newComment, ...comments]);
//       setComment('');
//       toast.success('Comment added successfully');
//     } catch (error) {
//       toast.error('Failed to add comment');
//     }
//   };

//   return (
//     <div className="space-y-4">
//       <form onSubmit={handleSubmitComment} className="flex space-x-2">
//         <input
//           type="text"
//           value={comment}
//           onChange={(e) => setComment(e.target.value)}
//           placeholder="Write a comment..."
//           className="flex-grow p-2 border rounded"
//         />
//         <button 
//           type="submit" 
//           className="bg-blue-500 text-white px-4 py-2 rounded"
//         >
//           Send
//         </button>
//       </form>

//       <div className="space-y-2">
//         {comments.map((comment) => (
//           <div key={comment.id} className="border-b pb-2">
//             <div className="font-semibold">{comment.user.name || comment.user.email}</div>
//             <div>{comment.comment}</div>
//             <div className="text-sm text-gray-500">
//               {new Date(comment.createdAt).toLocaleString()}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Chat;