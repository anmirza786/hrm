import Box from '@mui/material/Box'
import {useState, useEffect} from 'react'
import Button from '@mui/material/Button'
import { REQUEST_URL } from '../redux/constantURL'
import { addbook } from '../redux/actions/bookActions'
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'

function AddBooks() {
    const [cat, setcat] = useState('');
    const [category,setCategory] = useState('');
    useEffect(() => {
        fetch(REQUEST_URL + 'books/get-all-categories')
        .then(result=>result.json())
        .then(rows=>setCategory(rows))
      }, []);

    const handleChange = (event) => {
        setcat(event.target.value);
    };
    const handleaddbook = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const bookname= data.get("bookname")
        const author= data.get("author")
        const category= data.get("category")
        const published= data.get("date")
        addbook(bookname,author,category,`${published}T00:00:00.000+00:00`)
      };
    return (
        <div style={{display: "flex", justifyContent: "center", alignItems: "center",width: "100%"}}>
            <Box component="form" onSubmit={handleaddbook} style={{width: "300px"}}>
            <h1 style={{textAlign: "center", color: "#007FFF", margin: "0.5rem 0" }}>AddBooks</h1>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="bookname"
                      label="Enter Book Name"
                      name="bookname"
                      autoComplete="bookname"
                    />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      label="Enter Author Name"
                      name="author"
                      id="author"
                    />
                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                    <InputLabel id="demo-select-small">category</InputLabel>
                    <Select
                        labelId="demo-select-small"
                        id="category"
                        name="category"
                        value={cat}
                        label="Category"
                        onChange={handleChange}
                    >
                        <MenuItem value="">
                        <em>None</em>
                        </MenuItem>
                        {category&& category.map(cat=><MenuItem key={cat._id} value={cat._id}>
                        {cat.category_name}
                        </MenuItem>)}
                    </Select>
                    </FormControl>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      label="Enter Date Published"
                      type="date"
                      name="date"
                      id="date"
                      focused 
                    />
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                      style={{ color: "white" }}
                    >
                      AddBook
                    </Button>
                  </Box>
        </div>
    );
}

export default AddBooks;