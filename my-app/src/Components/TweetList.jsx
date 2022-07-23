// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Container from '@mui/material/Container';
// import { useState } from "react";

// export const AddNote = ({ handleAddNote }) => {
//     const [messageTitle, setMessageTitle] = useState("");
//     const [message, setMessage] = useState("");

//     const increment = () => {
//         if(message.trim().length > 0){
//             handleAddNote(message, messageTitle);
//             setMessage("");
//             setMessageTitle("");
//         }
//     };

//     return (
//         <div>
//             <Container maxWidth = "sm">
//                 <div>
//                     <form>
//                         <Box sx = {
//                             {
//                             borderRadius: '16px', 
//                             boxShadow: 4,
//                             bgcolor: '#A2B3A2',
//                             m: 2,
//                             height: '300px'
//                             }}>
//                             <input
//                             type="text"
//                             placeholder="Title goes here"
//                             value={messageTitle}
//                             onChange={e => setMessageTitle(e.target.value)}
//                             style={{margin: "10px", borderRadius: "10px", padding: "10px"}}
//                             />
//                             <Box
//                             sx={{
//                             width: 500,
//                             maxWidth: '95%',
//                             height: '280px',
//                             p: 2
//                             }}>
//                                 <TextareaAutosize
//                                 rows="8"
//                                 cols="10"
//                                 aria-label="empty textarea"
//                                 placeholder="Write your note..."
//                                 value={message}
//                                 onChange={e => setMessage(e.target.value)}
//                                 style={{ width: 450, borderRadius: 16, padding: 10, resize: "none", maxHeight: 180}}
//                                 />
//                             </Box>
//                         </Box> 
//                         <div align="center">
//                         <Button variant = "contained" onClick={ increment }>Add Note </Button> 
//                         </div>
//                     </form>
//                 </div>
//             </Container>
//         </div>
//     )
// };