import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './AsideForProductsList.scss';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
function AsideForProductsList({ setPage, setSearch, setOrder }) {
  //設定css
  const theme = createTheme({
    components: {
      // Name of the component
      MuiAccordion: {
        styleOverrides: {
          // Name of the slot
          root: {
            boxShadow: 'none',
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div className="products_layout-aside-accordion">
        <Accordion disableGutters={true}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Link
              className="link-decoration"
              to="../products/植物奶"
              onClick={() => {
                setPage(1);
                setSearch('');
                setOrder('');
              }}
            >
              植物奶
            </Link>
          </AccordionSummary>
          <AccordionDetails>
            <ul className="list-group">
              <li className="list-group-item products_layout-aside-list-group-item">
                <Link
                  className="link-decoration"
                  to="../products/植物奶/燕麥奶"
                  onClick={() => {
                    setPage(1);
                    setSearch('');
                    setOrder('');
                  }}
                >
                  燕麥奶
                </Link>
              </li>

              <li className="list-group-item products_layout-aside-list-group-item">
                <Link
                  className="link-decoration"
                  to="../products/植物奶/杏仁奶"
                  onClick={() => {
                    setPage(1);
                    setSearch('');
                    setOrder('');
                  }}
                >
                  杏仁奶
                </Link>
              </li>
              <li className="list-group-item products_layout-aside-list-group-item">
                <Link
                  className="link-decoration"
                  to="../products/植物奶/堅果奶"
                  onClick={() => {
                    setPage(1);
                    setSearch('');
                    setOrder('');
                  }}
                >
                  堅果奶
                </Link>
              </li>
            </ul>
          </AccordionDetails>
        </Accordion>
        <Accordion disableGutters={true}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Link
              className="link-decoration"
              to="../products/有機蔬果汁"
              onClick={() => {
                setPage(1);
                setSearch('');
                setOrder('');
              }}
            >
              有機蔬果汁
            </Link>
          </AccordionSummary>
          <AccordionDetails>
            <ul className="list-group">
              <li className="list-group-item products_layout-aside-list-group-item">
                <Link
                  className="link-decoration"
                  to="../products/有機蔬果汁/果汁"
                  onClick={() => {
                    setPage(1);
                    setSearch('');
                    setOrder('');
                  }}
                >
                  果汁
                </Link>
              </li>
              <li className="list-group-item products_layout-aside-list-group-item">
                <Link
                  className="link-decoration"
                  to="../products/有機蔬果汁/蔬菜汁、氣泡水"
                  onClick={() => {
                    setPage(1);
                    setSearch('');
                    setOrder('');
                  }}
                >
                  蔬菜汁、氣泡水
                </Link>
              </li>
              <li className="list-group-item products_layout-aside-list-group-item">
                <Link
                  className="link-decoration"
                  to="../products/有機蔬果汁/果昔、果醋"
                  onClick={() => {
                    setPage(1);
                    setSearch('');
                    setOrder('');
                  }}
                >
                  果昔、果醋
                </Link>
              </li>
            </ul>
          </AccordionDetails>
        </Accordion>
        <Accordion disableGutters={true}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3a-content"
            id="panel3a-header"
          >
            <Link
              className="link-decoration"
              to="../products/營養點心"
              onClick={() => {
                setPage(1);
                setSearch('');
                setOrder('');
              }}
            >
              營養點心
            </Link>
          </AccordionSummary>
          <AccordionDetails>
            <ul className="list-group">
              <li className="list-group-item products_layout-aside-list-group-item">
                <Link
                  className="link-decoration"
                  to="../products/營養點心/麥片"
                  onClick={() => {
                    setPage(1);
                    setSearch('');
                    setOrder('');
                  }}
                >
                  麥片
                </Link>
              </li>
              <li className="list-group-item products_layout-aside-list-group-item">
                <Link
                  className="link-decoration"
                  to="../products/營養點心/燕麥棒、蛋白棒"
                  onClick={() => {
                    setPage(1);
                    setSearch('');
                    setOrder('');
                  }}
                >
                  燕麥棒、蛋白棒
                </Link>
              </li>
              <li className="list-group-item products_layout-aside-list-group-item">
                <Link
                  className="link-decoration"
                  to="../products/營養點心/堅果"
                  onClick={() => {
                    setPage(1);
                    setSearch('');
                    setOrder('');
                  }}
                >
                  堅果
                </Link>
              </li>
            </ul>
          </AccordionDetails>
        </Accordion>
      </div>
    </ThemeProvider>
  );
}

export default AsideForProductsList;
