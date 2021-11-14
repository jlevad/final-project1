import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const SavedPage = ({ saved }) => {

  return (
    <section id="saved_page">
      <TableContainer>
        <Table
          sx={{ maxWidth: '80%', margin: 'auto' }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell>Sources</TableCell>
              <TableCell>Title</TableCell>
              <TableCell align="left">Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {saved.length === 0 ? (
              <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  No item saved
                </TableCell>
              </TableRow>
            ) : (
              saved.map((row, i) => (
                <TableRow
                  key={i}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.source.name}
                    <a
                      href={row.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2 px-3 bg-blue-500 text-white block mt-4 w-max"
                    >
                      Detail Page
                    </a>
                  </TableCell>
                  <TableCell>{row.title}</TableCell>
                  <TableCell align="left">{row.description}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </section>
  );
};

export default SavedPage;
