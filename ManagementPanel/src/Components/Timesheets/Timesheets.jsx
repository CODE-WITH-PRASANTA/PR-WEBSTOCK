import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox, IconButton, Button,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField, Box, Select, MenuItem, Typography,
  InputAdornment, Menu
} from '@mui/material';
import {
  Edit, Delete, Refresh, Download, Search, FilterList, Add, Event, HistoryToggleOff,
  KeyboardArrowDown, KeyboardArrowLeft, KeyboardArrowRight, Close, AccountCircle,
  BusinessCenter
} from '@mui/icons-material';
import dayjs from 'dayjs';
import './Timesheets.css';

// Initial data based on the screenshot
const initialData = [
  { id: 1, name: 'John Doe', date: '2025-01-10', project: 'Project A', task: 'Development', hours: 8, status: 'Approved', desc: 'Working on core modules' },
  { id: 2, name: 'Jane Smith', date: '2025-01-10', project: 'Project B', task: 'Testing', hours: 7, status: 'Pending', desc: '' },
  { id: 3, name: 'Bob Johnson', date: '2025-01-11', project: 'Project A', task: 'Documentation', hours: 4, status: 'Approved', desc: '' },
  { id: 4, name: 'Alice Williams', date: '2025-01-11', project: 'Project C', task: 'Design', hours: 6, status: 'Rejected', desc: '' },
  { id: 5, name: 'Charlie Brown', date: '2025-01-12', project: 'Project B', task: 'Bug Fixing', hours: 8, status: 'Approved', desc: '' },
  { id: 6, name: 'Diana Prince', date: '2025-01-12', project: 'Project A', task: 'Development', hours: 5, status: 'Pending', desc: '' },
  { id: 7, name: 'Edward Norton', date: '2025-01-13', project: 'Project D', task: 'Research', hours: 8, status: 'Approved', desc: '' },
  { id: 8, name: 'Fiona Gallagher', date: '2025-01-13', project: 'Project C', task: 'Development', hours: 7, status: 'Pending', desc: '' },
  { id: 9, name: 'George Miller', date: '2025-01-14', project: 'Project B', task: 'Testing', hours: 8, status: 'Approved', desc: '' },
  { id: 10, name: 'Hannah Montana', date: '2025-01-14', project: 'Project A', task: 'Meeting', hours: 2, status: 'Approved', desc: '' },
  { id: 11, name: 'Sample Extra 1', date: '2025-01-15', project: 'Project E', task: 'Planning', hours: 6, status: 'Approved', desc: '' },
  { id: 12, name: 'Sample Extra 2', date: '2025-01-15', project: 'Project F', task: 'Training', hours: 3, status: 'Pending', desc: '' },
];

const Timesheets = () => {
  const [timesheetData, setTimesheetData] = useState(initialData);
  const [selectedIds, setSelectedIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [currentEntry, setCurrentEntry] = useState(null); // for edit, null for add
  const [formData, setFormData] = useState({
    name: '', date: dayjs().format('YYYY-MM-DD'), project: '', task: '', hours: 0, status: 'Pending', desc: ''
  });

  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Column Visibility state
  const [columnAnchorEl, setColumnAnchorEl] = useState(null);
  const [columnVisibility, setColumnVisibility] = useState({
    Checkbox: true, Name: true, Date: true, Project: true, Task: true, Hours: true, Status: true, Actions: true,
  });

  // Handles checkboxes
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = filteredData.map((n) => n.id);
      setSelectedIds(newSelecteds);
      return;
    }
    setSelectedIds([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selectedIds.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedIds, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedIds.slice(1));
    } else if (selectedIndex === selectedIds.length - 1) {
      newSelected = newSelected.concat(selectedIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedIds.slice(0, selectedIndex),
        selectedIds.slice(selectedIndex + 1),
      );
    }
    setSelectedIds(newSelected);
  };

  const isSelected = (id) => selectedIds.indexOf(id) !== -1;

  // Handles Add/Edit modal
  const openModal = (entry = null) => {
    if (entry) {
      setCurrentEntry(entry);
      setFormData(entry);
    } else {
      setCurrentEntry(null);
      setFormData({
        name: '', date: dayjs().format('YYYY-MM-DD'), project: '', task: '', hours: 0, status: 'Pending', desc: ''
      });
    }
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSave = () => {
    if (currentEntry) {
      // Edit
      setTimesheetData(prev => prev.map(item => item.id === currentEntry.id ? { ...formData, id: currentEntry.id } : item));
    } else {
      // Add new
      const newId = timesheetData.length > 0 ? Math.max(...timesheetData.map(item => item.id)) + 1 : 1;
      setTimesheetData(prev => [...prev, { ...formData, id: newId }]);
    }
    closeModal();
  };

  // Functional features: Delete, Refresh, Download
  const handleDeleteRow = (id) => {
    setTimesheetData(prev => prev.filter(item => item.id !== id));
    setSelectedIds(prev => prev.filter(selectedId => selectedId !== id));
  };

  const handleRefreshData = () => {
    setSearchTerm('');
    setTimesheetData(initialData);
    setSelectedIds([]);
    setPage(0);
  };

  const handleDownloadData = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(timesheetData, null, 2)
    )}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute('download', 'timesheet_report.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Handles column visibility menu
  const handleColumnMenuClick = (event) => {
    setColumnAnchorEl(event.currentTarget);
  };

  const handleColumnMenuClose = () => {
    setColumnAnchorEl(null);
  };

  const toggleColumnVisibility = (column) => {
    setColumnVisibility(prev => ({ ...prev, [column]: !prev[column] }));
  };

  const isColumnVisible = (name) => columnVisibility[name];

  // Filtering based on search
  const filteredData = timesheetData.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.task.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Status badges mapping
  const statusBadge = (status) => {
    switch (status) {
      case 'Approved': return <span className="m-badge badge-approved">Approved</span>;
      case 'Pending': return <span className="m-badge badge-pending">Pending</span>;
      case 'Rejected': return <span className="m-badge badge-rejected">Rejected</span>;
      default: return null;
    }
  };

  // Pagination dynamic data
  const dynamicRows = filteredData.slice(page * rowsPerPage, (page + 1) * rowsPerPage);
  const totalEntries = filteredData.length;
  const entryStart = totalEntries === 0 ? 0 : page * rowsPerPage + 1;
  const entryEnd = Math.min((page + 1) * rowsPerPage, totalEntries);

  return (
    <div className="main-content">
      {/* Header */}
      <div className="top-header">
        <Typography variant="h5" component="h1">Timesheets</Typography>
        <div className="breadcrumb">
          <IconButton size="small"><AccountCircle fontSize="small" /></IconButton>
          <span>Attendance</span>
          <span>&gt;</span>
          <span>Timesheets</span>
        </div>
      </div>

      {/* Main Container */}
      <Paper elevation={0} className="ts-container ts-responsive">
        {/* Toolbar */}
        <div className="ts-toolbar">
          <Typography variant="subtitle1" component="h2">Timesheets</Typography>
          <TextField
            variant="outlined"
            placeholder="Search"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-field"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search fontSize="small" />
                </InputAdornment>
              ),
            }}
          />
          <div className="spacer" />
          <IconButton onClick={handleColumnMenuClick} title="Filter Columns"><FilterList /></IconButton>
          <IconButton onClick={() => openModal()} title="Add Entry"><Add style={{ color: 'green' }} /></IconButton>
          <IconButton onClick={handleRefreshData} title="Reset & Refresh"><Refresh /></IconButton>
          <IconButton onClick={handleDownloadData} title="Download Report"><Download /></IconButton>
        </div>

        {/* Column Hide/Show Menu */}
        <Menu
          anchorEl={columnAnchorEl}
          open={Boolean(columnAnchorEl)}
          onClose={handleColumnMenuClose}
          className="m-menu-hide"
        >
          <Typography variant="subtitle2" style={{ padding: '8px 16px' }}>Show/Hide Column</Typography>
          {Object.keys(columnVisibility).map((column) => (
            <MenuItem key={column} onClick={() => toggleColumnVisibility(column)} className="m-menu-item">
              <Checkbox size="small" checked={columnVisibility[column]} className="m-menu-check" />
              {column}
            </MenuItem>
          ))}
        </Menu>

        {/* Main Table */}
        <TableContainer>
          <Table stickyHeader className="m-table">
            <TableHead>
              <TableRow>
                {isColumnVisible('Checkbox') && (
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      size="small"
                      indeterminate={selectedIds.length > 0 && selectedIds.length < filteredData.length}
                      checked={filteredData.length > 0 && selectedIds.length === filteredData.length}
                      onChange={handleSelectAllClick}
                      inputProps={{ 'aria-label': 'select all timesheets' }}
                    />
                  </TableCell>
                )}
                {isColumnVisible('Name') && <TableCell>Employee Name</TableCell>}
                {isColumnVisible('Date') && <TableCell>Date</TableCell>}
                {isColumnVisible('Project') && <TableCell>Project</TableCell>}
                {isColumnVisible('Task') && <TableCell>Task</TableCell>}
                {isColumnVisible('Hours') && <TableCell>Hours</TableCell>}
                {isColumnVisible('Status') && <TableCell>Status</TableCell>}
                {isColumnVisible('Actions') && <TableCell>Actions</TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {dynamicRows.map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `ts-checkbox-${index}`;
                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    className="m-table-row"
                  >
                    {isColumnVisible('Checkbox') && (
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          size="small"
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                    )}
                    {isColumnVisible('Name') && <TableCell>{row.name}</TableCell>}
                    {isColumnVisible('Date') && <TableCell>{row.date}</TableCell>}
                    {isColumnVisible('Project') && <TableCell>{row.project}</TableCell>}
                    {isColumnVisible('Task') && <TableCell>{row.task}</TableCell>}
                    {isColumnVisible('Hours') && <TableCell>{row.hours}</TableCell>}
                    {isColumnVisible('Status') && <TableCell>{statusBadge(row.status)}</TableCell>}
                    {isColumnVisible('Actions') && (
                      <TableCell onClick={(e) => e.stopPropagation()}>
                        <IconButton
                          className="m-edit-btn"
                          size="small"
                          onClick={() => openModal(row)}
                        >
                          <Edit fontSize="inherit" />
                        </IconButton>
                        <IconButton
                          className="m-delete-btn"
                          size="small"
                          onClick={() => handleDeleteRow(row.id)}
                        >
                          <Delete fontSize="inherit" />
                        </IconButton>
                      </TableCell>
                    )}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Custom Pagination Footer */}
        <div className="m-custom-pagination">
          <div className="spacer" />
          <Typography className="p-label" variant="body2">Items per page:</Typography>
          <Select
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(parseInt(e.target.value, 10));
              setPage(0);
            }}
            size="small"
            className="p-select"
            variant="outlined"
            IconComponent={KeyboardArrowDown}
          >
            {[10, 25, 50, 100].map((pageSize) => (
              <MenuItem key={pageSize} value={pageSize}>
                {pageSize}
              </MenuItem>
            ))}
          </Select>
          <Typography className="p-display" variant="body2">
            {`${entryStart} – ${entryEnd} of ${totalEntries}`}
          </Typography>
          <IconButton size="small" onClick={() => setPage(prev => prev - 1)} disabled={page === 0} className="p-icon">
            <KeyboardArrowLeft />
          </IconButton>
          <IconButton size="small" onClick={() => setPage(prev => prev + 1)} disabled={(page + 1) * rowsPerPage >= totalEntries} className="p-icon">
            <KeyboardArrowRight />
          </IconButton>
        </div>
      </Paper>

      {/* Pop-up Modal (Add / Edit Form) */}
      <Dialog
        open={modalOpen}
        onClose={closeModal}
        fullWidth
        maxWidth="md"
        className="m-modal m-modal-responsive"
      >
        <DialogTitle className="m-modal-header">
          <span>{currentEntry ? `Edit: ${currentEntry.name}` : 'New Timesheet'}</span>
          <IconButton onClick={closeModal} className="m-close-modal">
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent className="m-modal-body">
          <Box component="form" className="m-form">
            <div className="m-form-field">
              <label>Employee Name*</label>
              <TextField
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                variant="outlined"
                fullWidth
                size="small"
                InputProps={{
                  endAdornment: <InputAdornment position="end"><AccountCircle /></InputAdornment>,
                }}
              />
            </div>

            <div className="m-form-field">
              <label>Date*</label>
              <TextField
                name="date"
                type="date"
                value={formData.date}
                onChange={handleInputChange}
                variant="outlined"
                fullWidth
                size="small"
                InputProps={{
                  endAdornment: <InputAdornment position="end"><Event /></InputAdornment>,
                }}
              />
            </div>

            <div className="m-form-field">
              <label>Project Name*</label>
              <TextField
                name="project"
                value={formData.project}
                onChange={handleInputChange}
                variant="outlined"
                fullWidth
                size="small"
                InputProps={{
                  endAdornment: <InputAdornment position="end"><BusinessCenter /></InputAdornment>,
                }}
              />
            </div>

            <div className="m-form-field">
              <label>Task*</label>
              <TextField
                name="task"
                value={formData.task}
                onChange={handleInputChange}
                variant="outlined"
                fullWidth
                size="small"
                InputProps={{
                  endAdornment: <InputAdornment position="end"><BusinessCenter /></InputAdornment>,
                }}
              />
            </div>

            <div className="m-form-field">
              <label>Hours*</label>
              <TextField
                name="hours"
                type="number"
                value={formData.hours}
                onChange={handleInputChange}
                variant="outlined"
                fullWidth
                size="small"
                InputProps={{
                  inputProps: { min: 0, max: 24 },
                  endAdornment: <InputAdornment position="end"><HistoryToggleOff /></InputAdornment>,
                }}
              />
            </div>

            <div className="m-form-field">
              <label>Status*</label>
              <Select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                variant="outlined"
                fullWidth
                size="small"
                displayEmpty
              >
                <MenuItem value="Approved">Approved</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Rejected">Rejected</MenuItem>
              </Select>
            </div>

            <div className="m-form-field m-full-width">
              <label>Description</label>
              <TextField
                name="desc"
                value={formData.desc}
                onChange={handleInputChange}
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                className="m-textarea"
              />
            </div>
          </Box>
        </DialogContent>
        <DialogActions className="m-modal-footer">
          <Button onClick={handleFormSave} variant="contained" className="m-save-btn">
            Save
          </Button>
          <Button onClick={closeModal} variant="contained" className="m-cancel-btn">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Timesheets;