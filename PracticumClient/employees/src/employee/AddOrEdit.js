
import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { TextField, Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Checkbox from '@mui/material/Checkbox';
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSignature, faIdCard, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";


const EmployeeForm = ({ formMode, employee, onSave, onCancel }) => {
  const [firstName, setFirstName] = useState(employee.firstName || "");
  const [lastName, setLastName] = useState(employee.lastName || "");
  const [password, setPassword] = useState(employee.password || "");
  const [id, setId] = useState(employee.id || "");
  const [startDate, setStartDate] = useState(employee.startDate || "");
  const [birthDate, setBirthDate] = useState(employee.birthDate || "");
  const [gender, setGender] = useState(+employee.gender || 0);
  const [selectedRoleName, setSelectedRoleName] = useState("");
  const [roles, setRoles] = useState([]);
  const [employeeRoles, setEmployeeRoles] = useState(employee.roles?.map(r => ({ roleId: r.role?.id, name: r.role?.name, startDate: r.dateOfStart, isManegerial: r.role?.isManegerial })) || []);
  const [startDateRole, setStartDateRole] = useState("");
  const [isManager, setIsManager] = useState(false);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get("https://localhost:7201/api/Role");
        setRoles(response.data.result);
      } catch (error) {
        console.error("Error fetching roles:", error.message);
      }
    };
    fetchRoles();
  }, []);

  const handleAddRole = () => {
    if (selectedRoleName && !employeeRoles.find((role) => role.name === selectedRoleName)) {
      const selectedRole = roles.find((role) => role.name === selectedRoleName);
      const roleWithDate = { roleId: selectedRole.id, startDate: startDateRole, name: selectedRoleName, isManegerial: isManager };
      setEmployeeRoles([...employeeRoles, roleWithDate]);
      setSelectedRoleName("");
    }
  };

  const handleDeleteRole = (roleName) => {
    const updatedNewRoles = employeeRoles.filter((r) => r.name !== roleName);
    setEmployeeRoles(updatedNewRoles);
  };

  const checkDuplicateId = async (id) => {
    try {
      const response = await axios.get(`https://localhost:7201/api/Employee/${id}`);
      return response.data.result !== null;
    } catch (error) {
      console.error("Error checking duplicate ID:", error.message);
      return false;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isDuplicateId = await checkDuplicateId(id);
    if (formMode === "create" && isDuplicateId) {
      alert("Employee with the same ID already exists.");
      return;
    }
    if (employeeRoles.length === 0) {
      alert("Error: Cannot add employee without at least one role.");
      return;
    }
    const birth = new Date(birthDate);
    const start = new Date(startDate);
    if (start < birth) {
      alert("Error: Birth date must be before employment start date");
      return;
    }
    const wrongRoles = employeeRoles.filter(r => new Date(r.startDate) < start).map(r => r.name);
    if (!!wrongRoles.length) {
      alert(`Error: Employee start date must be before role start date. [${wrongRoles.join(", ")}]`);
      return;
    }

    const updatedEmployee = {
      firstName,
      lastName,
      password,
      id,
      startDate,
      birthDate,
      gender,
      roles: employeeRoles.map((role) => ({ role: { id: role.roleId, name: role.name, isManegerial: role.isManegerial }, dateOfStart: role.startDate })),
    };

    const updatedNewRoles = employeeRoles.map((role) => ({
      ...role,
      startDateRole,
      isManager,
    }));

    onSave(updatedEmployee, updatedNewRoles);
  };



  const handleEditRole = (idx, field, value) => {
    const roles = employeeRoles;
    roles[idx][field] = value;
    setEmployeeRoles([...roles]);
  }

  return (
    <div style={{ display: "grid", placeItems: "center", height: "100vh" }}>
      <h2 style={{ marginBottom: "1rem", fontFamily: "Arial, sans-serif" }}>{employee.id ? "Edit employee " : "Add employee"}</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: "fit-content", maxWidth: "90vw" }}>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {/* Form inputs */}
          {/* First name */}
          <li style={{ marginBottom: "1rem" }}>
            <label htmlFor="firstNameInput" style={{ fontWeight: "bold", fontSize: "16px" }}> First name:</label>
            <TextField
              id="firstNameInput"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
              required
              sx={{ width: "100%", borderRadius: "10px", boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)" }}
            />
          </li>
          {/* Last name */}
          <li style={{ marginBottom: "1rem" }}>
            <label htmlFor="lastNameInput" style={{ fontWeight: "bold", fontSize: "16px" }}>Last name :</label>
            <TextField
              id="lastNameInput"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
              required
              sx={{ width: "100%", borderRadius: "10px", boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)" }}
            />
          </li>
          {/* Password */}
          <li style={{ marginBottom: "1rem" }}>
            <label htmlFor="passwordInput" style={{ fontWeight: "bold", fontSize: "16px" }}>Password:</label>
            <TextField
              id="passwordInput"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required={formMode === "create"}
              sx={{ width: "100%", borderRadius: "10px", boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)" }}
            />
          </li>
          {/* Identity */}
          <li style={{ marginBottom: "1rem" }}>
            <label htmlFor="idInput" style={{ fontWeight: "bold", fontSize: "16px" }}>Identity :</label>
            <TextField
              id="idInput"
              type="number"
              value={id}
              onChange={(event) => setId(event.target.value)}
              required
              inputProps={{ minLength: 9, maxLength: 9 }}
              sx={{ width: "100%", borderRadius: "10px", boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)" }}
            />
          </li>
          {/* Date of start */}
          <li style={{ marginBottom: "1rem" }}>
            <label htmlFor="startDateInput" style={{ fontWeight: "bold", fontSize: "16px" }}>Date of start  :</label>
            <TextField
              id="startDateInput"
              type="date"
              value={startDate}
              onChange={(event) => setStartDate(event.target.value)}
              required
              sx={{ width: "100%", borderRadius: "10px", boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)" }}
            />
          </li>
          {/* Birth date */}
          <li style={{ marginBottom: "2rem" }}>
            <label htmlFor="birthDateInput" style={{ fontWeight: "bold", fontSize: "16px" }}>BirthDate :</label>
            <TextField
              id="birthDateInput"
              type="date"
              value={birthDate}
              onChange={(event) => setBirthDate(event.target.value)}
              required
              sx={{ width: "100%", borderRadius: "10px", boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)" }}
            />
          </li>
          {/* Gender */}
          <li style={{ marginBottom: "1rem" }}>
            <label htmlFor="genderInput" style={{ fontWeight: "bold", fontSize: "16px" }}>Gender:</label>
            <Select
              id="genderInput"
              value={gender}
              onChange={(event) => setGender(event.target.value)}
              required
              sx={{ width: "100%", borderRadius: "10px", boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)" }}
            >
              <MenuItem value={0}>Male</MenuItem>
              <MenuItem value={1}>Female</MenuItem>
            </Select>
          </li>
        </ul>
        {/* Roles section */}
        <h3 style={{ marginBottom: "1rem", fontFamily: "Arial, sans-serif", fontWeight: "bold", fontSize: "18px" }}>Roles</h3>
        {!!employeeRoles.length &&
          <Table style={{ margin: '0 auto', width: '100%', borderCollapse: 'collapse' }}>
            <TableHead style={{ backgroundColor: '#ffffff', borderBottom: '2px solid #ccc' }}>
              <TableRow style={{ backgroundColor: '#ffffff' }}>
                <TableCell style={{ fontWeight: 'bold', fontSize: '1rem', border: '1px solid #ccc', color: '#000', backgroundColor: '#ffffff', fontFamily: "Arial, Helvetica, sans-serif", textTransform: 'none', padding: '10px 20px' }}>
                  <FontAwesomeIcon icon={faSignature} style={{ marginRight: '5px' }} />
                  <span style={{ fontWeight: 'bold' }}> Name</span>
                </TableCell>
                <TableCell style={{ fontWeight: 'bold', fontSize: '1rem', border: '1px solid #ccc', color: '#000', backgroundColor: '#ffffff', padding: '10px 20px' }}>
                  <FontAwesomeIcon icon={faCalendarAlt} style={{ marginRight: '5px' }} />
                  <span style={{ fontWeight: 'bold' }}>Date of Start</span>
                </TableCell>
                <TableCell style={{ fontWeight: 'bold', fontSize: '1rem', border: '1px solid #ccc', color: '#000', backgroundColor: '#ffffff', padding: '10px 20px' }}>
                  <FontAwesomeIcon icon={faUser} style={{ marginRight: '5px' }} />
                  <span style={{ fontWeight: 'bold' }}> Is manegerial</span>
                </TableCell>
                <TableCell style={{ fontWeight: 'bold', fontSize: '1rem', border: '1px solid #ccc', color: '#000', backgroundColor: '#ffffff', padding: '10px 20px' }}>
                  <FontAwesomeIcon icon={faTrash} style={{ marginRight: '5px' }} />
                  <span style={{ fontWeight: 'bold' }}>Delete</span>
                </TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {/* תוכן הטבלה */}
              {employeeRoles.map((r, idx) => (
                <TableRow key={idx}>
                  <TableCell>{r.name}</TableCell>
                  <TableCell>
                    <TextField
                      id="startDateRoleInput"
                      type="date"
                      value={r.startDate}
                      onChange={(event) => handleEditRole(idx, "startDate", event.target.value)}
                      required
                      sx={{ width: "100%", marginBottom: "1rem", borderRadius: "10px", boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)" }}
                    />
                  </TableCell>
                  <TableCell>
                    <Checkbox
                      checked={r.isManegerial}
                      onChange={(event) => handleEditRole(idx, "isManegerial", event.target.checked)}
                    />
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => handleDeleteRole(r.name)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

        }
        {/* Add role form */}
        <FormControl style={{ marginBottom: "1rem", marginTop: "1rem", borderRadius: "10px", boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)" }}>
          <InputLabel style={{ fontWeight: "bold", fontSize: "16px" }}>Add role </InputLabel>
          <Select
            value={selectedRoleName}
            onChange={(event) => setSelectedRoleName(event.target.value)}
          >
            {roles.map((role) => (
              <MenuItem key={role.id} value={role.name}>
                {role.name} - {role.Description}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {/* Additional role fields */}
        {selectedRoleName &&
          <Fragment>
            {/* Start date */}
            <label htmlFor="startDateRoleInput" style={{ marginBottom: "1rem", display: "block", fontWeight: "bold", fontSize: "16px" }}>Date of start  :</label>
            <TextField
              id="startDateRoleInput"
              type="date"
              value={startDateRole}
              onChange={(event) => setStartDateRole(event.target.value)}
              required
              sx={{ width: "100%", marginBottom: "1rem", borderRadius: "10px", boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)" }}
            />
            {/* Is manager checkbox */}
            <FormControl style={{ marginBottom: "1rem", borderRadius: "10px", boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)" }}>
              <InputLabel style={{ fontWeight: "bold", fontSize: "16px" }}>A managerial position </InputLabel>
              <Select
                value={isManager}
                onChange={(event) => setIsManager(event.target.value)}
              >
                <MenuItem value={true}>Yes</MenuItem>
                <MenuItem value={false}>No</MenuItem>
              </Select>
            </FormControl>
            {/* Add role button */}
            <Button type="button" disabled={!selectedRoleName || !startDateRole} onClick={handleAddRole} style={{ marginRight: "0.5rem", marginBottom: "1rem", fontWeight: "bold", fontSize: "16px" }}>
              Add role
            </Button>
          </Fragment>
        }
        {/* Form buttons */}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button type="submit" style={{ backgroundColor: '#007bff', color: 'white', fontWeight: 'bold' }}>
            {formMode === "create" ? "Create" : "Save"}
          </Button>
          <Button type="button" onClick={onCancel} style={{ backgroundColor: '#007bff', color: 'white', fontWeight: 'bold' }}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );

};

export default EmployeeForm;
