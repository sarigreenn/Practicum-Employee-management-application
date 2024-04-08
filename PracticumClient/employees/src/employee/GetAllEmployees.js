
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrash, faList, faUser, faSignature, faIdCard, faCalendarAlt, faSearch, faUserPlus, faFileExcel, faPrint } from "@fortawesome/free-solid-svg-icons";
import * as XLSX from 'xlsx';
import FileSaver from 'file-saver';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import EmployeeForm from "./AddOrEdit";
import { Typography } from "@mui/material";
import logo from "../images/logo.png";
const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [formMode, setFormMode] = useState(undefined);
  const [selectedEmployee, setSelectedEmployee] = useState({});
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://localhost:7201/api/Employee");
        setEmployees(response.data);
        setFilteredEmployees(response.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };
    fetchData();
  }, []);

  const handleSearch = (event) => {
    const searchText = event.target.value.toLowerCase();
    const filteredList = employees.filter((employee) => (
      (employee.firstName?.toLowerCase().includes(searchText)) ||
      (employee.lastName?.toLowerCase().includes(searchText)) ||
      (employee.id?.toString().includes(searchText)) ||
      (employee.startDate?.toString().includes(searchText))
    ));
    setFilteredEmployees(filteredList);
  };

  const handleAddEmployee = () => {
    const employee = {
      firstName: "",
      lastName: "",
      id: "",
      startDate: "",
      birthDate: "",
      gender: "",
      roles: [],
    };
    setFormMode("create");
    setSelectedEmployee(employee);
    setOpen(true);
  };

  const handleEditEmployee = (employee) => {
    setFormMode("edit");
    setSelectedEmployee(employee);
    setOpen(true);
  };

  const handleDeleteEmployee = async (employee) => {
    try {
      await axios.delete(`https://localhost:7201/api/Employee/${employee.id}`);
      const updatedEmployees = filteredEmployees.filter((emp) => emp.id !== employee.id);
      setFilteredEmployees(updatedEmployees);
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  const handleSubmitEmployee = async (employee) => {
    try {
      const data = { ...employee, roles: employee.roles.map(r => ({ roleId: r.role.id, startDate: r.dateOfStart })) }
      if (formMode === "create")
        await axios.post("https://localhost:7201/api/Employee", data);
      else
        await axios.put(`https://localhost:7201/api/Employee/${employee.id}`, data);
      const updatedEmployees = [...employees];
      const index = updatedEmployees.findIndex(emp => emp.id === employee.id);
      if (index !== -1) {
        updatedEmployees[index] = employee;
      } else {
        updatedEmployees.push(employee);
      }
      setEmployees(updatedEmployees);
      setFilteredEmployees(updatedEmployees);
      setFormMode(undefined);
      setOpen(false);
    } catch (error) {
      console.error("Error saving employee:", error);
    }
  };

  const handleCancelEdit = () => {
    setFormMode(undefined);
    setSelectedEmployee({});
    setOpen(false);
  };

  const handleExportEmployees = () => {
    const data = filteredEmployees?.map(employee => ({
      Name: employee.firstName,
      LastName: employee.lastName,
      ID: employee.id,
      StartDate: employee.startDate
    }));
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Employees");
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const fileName = "employees.xlsx";
    const file = new Blob([wbout], { type: 'application/octet-stream' });
    FileSaver.saveAs(file, fileName);
  };

  const handlePrintList = () => {
    window.print();
  };

  return (
    <>

      <Box textAlign="center" p={2}>
        <Box color="black" width="100%" height="152px" textAlign="center" fontSize="1rem" display="flex" alignItems="center" position="fixed" columnGap="10px" justifyContent="center">
          <FontAwesomeIcon icon={faList} />
          <Typography variant="h5" style={{ fontWeight: 'bold', fontSize: '40px' }}>Employee List</Typography>
        </Box>
        <Box bgcolor="#f2f2f2" display="flex" alignItems="center" p={2}>
          <img
            src={logo}
            alt="Employee List"
            style={{ height: '120px' }}
          />
        </Box>

        <br />
        <br />
        <Box display="flex" justifyContent="center" alignItems="center">
          <TextField
            type="text"
            placeholder=" Search employees.."
            onChange={handleSearch}
            size="small"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <Box mr={1}>
                  <FontAwesomeIcon icon={faSearch} style={{ color: '#007bff' }} />
                </Box>
              ),
            }}
          />
          <Box ml={2}>
            <Button style={{ backgroundColor: '#007bff', color: 'white', fontWeight: 'bold', fontFamily: "Arial, Helvetica, sans-serif", textTransform: 'none' }} onClick={handleAddEmployee}>
              <FontAwesomeIcon icon={faUserPlus} style={{ marginRight: '5px' }} /> Add employee
            </Button>
          </Box>
          <Box ml={2}>
            <Button style={{ backgroundColor: '#007bff', color: 'white', fontWeight: 'bold', fontFamily: "Arial, Helvetica, sans-serif", textTransform: 'none' }} onClick={handleExportEmployees}>
              <FontAwesomeIcon icon={faFileExcel} style={{ marginRight: '5px' }} /> Export to excel
            </Button>
          </Box>
          <Box ml={2}>
            <Button style={{ backgroundColor: '#007bff', color: 'white', fontWeight: 'bold', fontFamily: "Arial, Helvetica, sans-serif", textTransform: 'none' }} onClick={handlePrintList}>
              <FontAwesomeIcon icon={faPrint} style={{ marginRight: '5px' }} /> Print
            </Button>
          </Box>
        </Box>
        <br />
        <br />
        <Table style={{ margin: '0 auto', width: '100%', borderCollapse: 'collapse' }}>
          <TableHead style={{ backgroundColor: '#ffffff', borderBottom: '2px solid #ccc' }}>
            <TableRow style={{ backgroundColor: '#ffffff' }}>
              <TableCell style={{ fontWeight: 'bold', fontSize: '1rem', border: '1px solid #ccc', color: '#000', backgroundColor: '#ffffff', fontFamily: "Arial, Helvetica, sans-serif", textTransform: 'none' }}>
                <FontAwesomeIcon icon={faUser} style={{ marginRight: '5px' }} />
                <span style={{ fontWeight: 'bold' }}>First name </span>
              </TableCell>
              <TableCell style={{ fontWeight: 'bold', fontSize: '1rem', border: '1px solid #ccc', color: '#000', backgroundColor: '#ffffff' }}>
                <FontAwesomeIcon icon={faSignature} style={{ marginRight: '5px' }} />
                <span style={{ fontWeight: 'bold' }}>Last name </span>
              </TableCell>
              <TableCell style={{ fontWeight: 'bold', fontSize: '1rem', border: '1px solid #ccc', color: '#000', backgroundColor: '#ffffff' }}>
                <FontAwesomeIcon icon={faIdCard} style={{ marginRight: '5px' }} />
                <span style={{ fontWeight: 'bold' }}>Id </span>
              </TableCell>
              <TableCell style={{ fontWeight: 'bold', fontSize: '1rem', border: '1px solid #ccc', color: '#000', backgroundColor: '#ffffff' }}>
                <FontAwesomeIcon icon={faCalendarAlt} style={{ marginRight: '5px' }} />
                <span style={{ fontWeight: 'bold' }}>Date of Start </span>
              </TableCell>
              <TableCell style={{ border: '1px solid #ccc' }}></TableCell>
              <TableCell style={{ border: '1px solid #ccc' }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!!filteredEmployees.length ? (
              filteredEmployees.map((employee, index) => (
                <TableRow key={index} style={{ backgroundColor: index % 2 === 0 ? '#f2f2f2' : '#ffffff' }}>
                  <TableCell style={{ border: '1px solid #ccc', fontWeight: 'normal', fontSize: '1rem', backgroundColor: index % 2 === 0 ? '#f2f2f2' : '#ffffff' }}>{employee.firstName}</TableCell>
                  <TableCell style={{ border: '1px solid #ccc', fontWeight: 'normal', fontSize: '1rem', backgroundColor: index % 2 === 0 ? '#f2f2f2' : '#ffffff' }}>{employee.lastName}</TableCell>
                  <TableCell style={{ border: '1px solid #ccc', fontWeight: 'normal', fontSize: '1rem', backgroundColor: index % 2 === 0 ? '#f2f2f2' : '#ffffff' }}>{employee.id}</TableCell>
                  <TableCell style={{ border: '1px solid #ccc', fontWeight: 'normal', fontSize: '1rem', backgroundColor: index % 2 === 0 ? '#f2f2f2' : '#ffffff' }}>{employee.startDate}</TableCell>
                  <TableCell style={{ border: '1px solid #ccc' }}>
                    <Button onClick={() => handleEditEmployee(employee)}>
                      <FontAwesomeIcon icon={faPencilAlt} />
                    </Button>
                  </TableCell>
                  <TableCell style={{ border: '1px solid #ccc' }}>
                    <Button onClick={() => handleDeleteEmployee(employee)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">לא נמצאו עובדים</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <Dialog open={open} onClose={handleCancelEdit}>
          <DialogContent width="500px">
            <EmployeeForm
              formMode={formMode}
              employee={selectedEmployee}
              onSave={handleSubmitEmployee}
              onCancel={handleCancelEdit}
            />
          </DialogContent>
          <DialogActions>

          </DialogActions>
        </Dialog>
        <br />
        <br />
        <Box bgcolor="#f2f2f2" color="black" p={2} width="100%" textAlign="center" fontSize="1rem">
          <p style={{ fontWeight: 'bold', margin: 0 }}>© All rights reserved to sari greenblat</p>
        </Box>
      </Box>
    </>
  );
};

export default EmployeeList;
