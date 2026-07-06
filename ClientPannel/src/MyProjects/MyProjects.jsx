import React, { useState } from 'react';
import { 
  Plus, RotateCw, Download, Trash2, Edit3, 
  Search, SlidersHorizontal, ChevronLeft, ChevronRight, X,
  Briefcase, Bookmark, CheckSquare, User, Calendar
} from 'lucide-react';

// Initial Mock Data mirroring your first image
const INITIAL_DATA = [
  { id: 1, name: 'Chat App', type: 'Software', openTasks: 5, lead: 'Angelica Ramos', status: 'Active', created: '2020-02-25', modified: '2020-02-25' },
  { id: 2, name: 'Jasper Report', type: 'Software', openTasks: 15, lead: 'Airi Satou', status: 'New', created: '2020-02-25', modified: '2020-02-25' },
  { id: 3, name: 'Java Project', type: 'Software', openTasks: 11, lead: 'Jens Brincker', status: 'Active', created: '2020-02-25', modified: '2020-02-25' },
  { id: 4, name: 'Testing Website', type: 'Software', openTasks: 0, lead: 'John Doe', status: 'Hold', created: '2020-02-25', modified: '2020-02-25' },
  { id: 5, name: 'Website SEO', type: 'Software', openTasks: 22, lead: 'Cara Stevens', status: 'Closed', created: '2020-02-25', modified: '2020-02-25' },
  { id: 6, name: 'Jasper Report', type: 'Software', openTasks: 10, lead: 'Airi Satou', status: 'New', created: '2020-02-25', modified: '2020-02-25' },
  { id: 7, name: 'Java Project', type: 'Software', openTasks: 15, lead: 'Angelica Ramos', status: 'Active', created: '2020-02-25', modified: '2020-02-25' },
  { id: 8, name: 'Testing Website', type: 'Software', openTasks: 7, lead: 'John Doe', status: 'Active', created: '2020-02-25', modified: '2020-02-25' },
  { id: 9, name: 'Jasper Report', type: 'Software', openTasks: 0, lead: 'Cara Stevens', status: 'Closed', created: '2020-02-25', modified: '2020-02-25' },
  { id: 10, name: 'PHP website', type: 'Software', openTasks: 19, lead: 'Jens Brincker', status: 'New', created: '2020-02-25', modified: '2020-02-25' },
  { id: 11, name: 'Analytics Dashboard', type: 'Software', openTasks: 3, lead: 'John Doe', status: 'Active', created: '2020-03-12', modified: '2020-03-15' },
  { id: 12, name: 'Mobile App API', type: 'Software', openTasks: 8, lead: 'Airi Satou', status: 'Hold', created: '2020-04-01', modified: '2020-04-05' },
];

const MyProjects = () => {
  // --- Core States ---
  const [projects, setProjects] = useState(INITIAL_DATA);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);
  
  // --- Pagination States ---
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // --- Dropdown Toggle States ---
  const [showColumnDropdown, setShowColumnDropdown] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState({
    checkbox: true, projectName: true, projectType: true, 
    openTasks: true, leadName: true, status: true,
    createdDate: true, lastModified: true, actions: true
  });

  // --- Modal States ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
  const [formData, setFormData] = useState({
    id: null, name: '', type: '', openTasks: '', lead: '', status: 'New', created: '2026-07-06', modified: '2026-07-06'
  });

  // --- Functions / Handlers ---
  const handleRefresh = () => {
    setProjects(INITIAL_DATA);
    setSearchTerm('');
    setSelectedIds([]);
    setCurrentPage(1);
  };

  const handleDownload = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(projects, null, 2))}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute('download', 'projects_report.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleDeleteSingle = (id) => {
    if(window.confirm("Are you sure you want to delete this project?")) {
      setProjects(projects.filter(p => p.id !== id));
      setSelectedIds(selectedIds.filter(sid => sid !== id));
    }
  };

  const handleDeleteSelected = () => {
    if(window.confirm(`Are you sure you want to delete the ${selectedIds.length} selected project(s)?`)) {
      setProjects(projects.filter(p => !selectedIds.includes(p.id)));
      setSelectedIds([]);
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(currentItems.map(p => p.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectRow = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(sid => sid !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const openAddModal = () => {
    setModalMode('add');
    setFormData({ id: null, name: '', type: '', openTasks: '', lead: '', status: 'New', created: '2026-07-06', modified: '2026-07-06' });
    setIsModalOpen(true);
  };

  const openEditModal = (project) => {
    setModalMode('edit');
    setFormData({ ...project });
    setIsModalOpen(true);
  };

  const handleFormSave = (e) => {
    e.preventDefault();
    if (modalMode === 'add') {
      const newProject = {
        ...formData,
        id: Date.now(),
        openTasks: parseInt(formData.openTasks) || 0
      };
      setProjects([newProject, ...projects]);
    } else {
      setProjects(projects.map(p => p.id === formData.id ? { ...formData, openTasks: parseInt(formData.openTasks) || 0, modified: '2026-07-06' } : p));
    }
    setIsModalOpen(false);
  };

  // --- Filtering & Pagination Calculations ---
  const filteredProjects = projects.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.lead.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProjects.slice(indexOfFirstItem, indexOfLastItem);

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Active': return 'bg-emerald-50 text-emerald-600 border border-emerald-200';
      case 'New': return 'bg-blue-50 text-blue-600 border border-blue-100';
      case 'Hold': return 'bg-orange-50 text-orange-500 border border-orange-100';
      case 'Closed': return 'bg-rose-50 text-rose-500 border border-rose-100';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans antialiased text-slate-700">
      
      {/* Breadcrumb Header */}
      <div className="max-w-7xl mx-auto mb-4 flex justify-between items-center text-xs text-slate-500">
        <div className="flex items-center gap-1">
          <span className="cursor-pointer hover:text-slate-800">🏠</span>
          <span>&gt;</span>
          <span className="cursor-pointer hover:text-slate-800">Client</span>
          <span>&gt;</span>
          <span className="text-slate-800 font-medium">My Projects</span>
        </div>
      </div>

      {/* Main Module Layout Container */}
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-sm border border-slate-100 overflow-hidden">
        
        {/* Module Bar Controls */}
        <div className="p-4 bg-slate-50/70 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1">
            <h1 className="text-md font-semibold text-slate-800 whitespace-nowrap">My Projects</h1>
            
            {/* Search Input */}
            <div className="relative w-full max-w-xs">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search" 
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                className="w-full pl-9 pr-4 py-1.5 bg-white border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              />
            </div>
          </div>

          {/* Action Toolbar */}
          <div className="flex items-center gap-2 self-end md:self-auto">
            {selectedIds.length > 0 && (
              <button 
                onClick={handleDeleteSelected}
                className="flex items-center gap-1 px-3 py-1.5 bg-rose-600 text-white text-sm font-medium rounded-md hover:bg-rose-700 transition-colors shadow-sm"
              >
                <Trash2 size={15} /> Delete ({selectedIds.length})
              </button>
            )}

            {/* Column Visiblity Toggle Dropdown Target */}
            <div className="relative">
              <button 
                onClick={() => setShowColumnDropdown(!showColumnDropdown)}
                className={`p-2 rounded-md border text-slate-600 transition-all ${showColumnDropdown ? 'bg-indigo-50 border-indigo-300 text-indigo-600' : 'bg-white border-slate-200 hover:bg-slate-50'}`}
              >
                <SlidersHorizontal size={17} />
              </button>

              {/* Show/Hide Column Floating Card View Popup */}
              {showColumnDropdown && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setShowColumnDropdown(false)}></div>
                  <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-lg shadow-lg z-20 py-2 animate-in fade-in slide-in-from-top-1 duration-150">
                    <div className="px-4 py-1 text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-50 pb-2 mb-1">
                      Show/Hide Column
                    </div>
                    <div className="max-h-60 overflow-y-auto px-2 space-y-0.5">
                      {Object.keys(visibleColumns).map((colKey) => (
                        <label key={colKey} className="flex items-center gap-3 px-2 py-1.5 hover:bg-slate-50 rounded cursor-pointer text-sm font-medium capitalize text-slate-600">
                          <input 
                            type="checkbox" 
                            checked={visibleColumns[colKey]} 
                            onChange={(e) => setVisibleColumns({...visibleColumns, [colKey]: e.target.checked})}
                            className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          {colKey.replace(/([A-Z])/g, ' $1')}
                        </label>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            <button onClick={openAddModal} className="p-2 bg-white text-emerald-600 border border-slate-200 rounded-md hover:bg-emerald-50 hover:border-emerald-200 transition-colors" title="Add Project">
              <Plus size={17} />
            </button>
            <button onClick={handleRefresh} className="p-2 bg-white text-slate-600 border border-slate-200 rounded-md hover:bg-slate-50 transition-colors" title="Refresh List">
              <RotateCw size={17} />
            </button>
            <button onClick={handleDownload} className="p-2 bg-white text-blue-600 border border-slate-200 rounded-md hover:bg-blue-50 hover:border-blue-200 transition-colors" title="Export JSON Data">
              <Download size={17} />
            </button>
          </div>
        </div>

        {/* Responsive Table Wrapper */}
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-white border-b border-slate-100 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                {visibleColumns.checkbox && (
                  <th className="p-4 w-12 text-center">
                    <input 
                      type="checkbox" 
                      onChange={handleSelectAll}
                      checked={currentItems.length > 0 && currentItems.every(p => selectedIds.includes(p.id))}
                      className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                    />
                  </th>
                )}
                {visibleColumns.projectName && <th className="p-4">Project Name</th>}
                {visibleColumns.projectType && <th className="p-4">Project Type</th>}
                {visibleColumns.openTasks && <th className="p-4">Open Tasks</th>}
                {visibleColumns.leadName && <th className="p-4">Lead Name</th>}
                {visibleColumns.status && <th className="p-4">Status</th>}
                {visibleColumns.createdDate && <th className="p-4">Created Date</th>}
                {visibleColumns.lastModified && <th className="p-4">Last Modified</th>}
                {visibleColumns.actions && <th className="p-4 text-center">Actions</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm font-medium text-slate-600">
              {currentItems.length > 0 ? (
                currentItems.map((project) => (
                  <tr key={project.id} className="hover:bg-slate-50/50 transition-colors">
                    {visibleColumns.checkbox && (
                      <td className="p-4 text-center">
                        <input 
                          type="checkbox" 
                          checked={selectedIds.includes(project.id)}
                          onChange={() => handleSelectRow(project.id)}
                          className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                        />
                      </td>
                    )}
                    {visibleColumns.projectName && <td className="p-4 text-slate-900 font-semibold">{project.name}</td>}
                    {visibleColumns.projectType && <td className="p-4 text-slate-500 font-normal">{project.type}</td>}
                    {visibleColumns.openTasks && <td className="p-4 font-normal text-slate-800">{project.openTasks}</td>}
                    {visibleColumns.leadName && <td className="p-4 font-normal text-slate-800">{project.lead}</td>}
                    {visibleColumns.status && (
                      <td className="p-4">
                        <span className={`px-2.5 py-0.5 rounded text-xs font-semibold ${getStatusStyle(project.status)}`}>
                          {project.status}
                        </span>
                      </td>
                    )}
                    {visibleColumns.createdDate && (
                      <td className="p-4 text-slate-500 font-normal">
                        <span className="inline-flex items-center gap-1.5">📅 {project.created}</span>
                      </td>
                    )}
                    {visibleColumns.lastModified && (
                      <td className="p-4 text-slate-500 font-normal">
                        <span className="inline-flex items-center gap-1.5">📅 {project.modified}</span>
                      </td>
                    )}
                    {visibleColumns.actions && (
                      <td className="p-4">
                        <div className="flex items-center justify-center gap-3">
                          <button onClick={() => openEditModal(project)} className="text-blue-500 hover:text-blue-700 transition-colors" title="Edit row">
                            <Edit3 size={16} />
                          </button>
                          <button onClick={() => handleDeleteSingle(project.id)} className="text-orange-500 hover:text-orange-700 transition-colors" title="Delete row">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="text-center p-8 text-slate-400 font-normal">
                    No records or matching rows found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer & Dynamic Pagination Section */}
        <div className="p-4 bg-white border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <span>Items per page:</span>
            <select 
              value={itemsPerPage} 
              onChange={(e) => { setItemsPerPage(parseInt(e.target.value)); setCurrentPage(1); }}
              className="bg-white border border-slate-200 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-medium"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </div>

          <div className="flex items-center gap-4">
            <span>
              {filteredProjects.length > 0 ? indexOfFirstItem + 1 : 0} – {Math.min(indexOfLastItem, filteredProjects.length)} of {filteredProjects.length}
            </span>
            <div className="flex items-center gap-1">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-1 rounded border border-slate-200 hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
              >
                <ChevronLeft size={16} />
              </button>
              <button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-1 rounded border border-slate-200 hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- SMOOTH ACTION OVERLAY MODAL (Add / Edit Contexts) --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-xl border border-slate-100 w-full max-w-2xl overflow-hidden transform transition-all scale-100 animate-in zoom-in-95 duration-200">
            
            {/* Modal Title Banner */}
            <div className="bg-indigo-600 text-white px-6 py-4 flex items-center justify-between">
              <h2 className="text-md font-semibold tracking-wide">
                {modalMode === 'add' ? 'New Project' : formData.name}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-white/80 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Modal Input Form Grid */}
            <form onSubmit={handleFormSave} className="p-6 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Name */}
                <div className="relative">
                  <label className="block text-xs font-medium text-slate-500 mb-1">Project Name*</label>
                  <div className="relative">
                    <input 
                      type="text" required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full border border-slate-200 rounded-md pl-3 pr-10 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500"
                    />
                    <Briefcase className="absolute right-3 top-2.5 h-4 w-4 text-slate-400" />
                  </div>
                </div>

                {/* Type */}
                <div className="relative">
                  <label className="block text-xs font-medium text-slate-500 mb-1">Project Type*</label>
                  <div className="relative">
                    <input 
                      type="text" required
                      value={formData.type}
                      onChange={(e) => setFormData({...formData, type: e.target.value})}
                      className="w-full border border-slate-200 rounded-md pl-3 pr-10 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500"
                    />
                    <Bookmark className="absolute right-3 top-2.5 h-4 w-4 text-slate-400" />
                  </div>
                </div>

                {/* Open Tasks Count */}
                <div className="relative">
                  <label className="block text-xs font-medium text-slate-500 mb-1">Open task*</label>
                  <div className="relative">
                    <input 
                      type="number" min="0" required
                      value={formData.openTasks}
                      onChange={(e) => setFormData({...formData, openTasks: e.target.value})}
                      className="w-full border border-slate-200 rounded-md pl-3 pr-10 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500"
                    />
                    <CheckSquare className="absolute right-3 top-2.5 h-4 w-4 text-slate-400" />
                  </div>
                </div>

                {/* Lead Name */}
                <div className="relative">
                  <label className="block text-xs font-medium text-slate-500 mb-1">Lead name*</label>
                  <div className="relative">
                    <input 
                      type="text" required
                      value={formData.lead}
                      onChange={(e) => setFormData({...formData, lead: e.target.value})}
                      className="w-full border border-slate-200 rounded-md pl-3 pr-10 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500"
                    />
                    <User className="absolute right-3 top-2.5 h-4 w-4 text-slate-400" />
                  </div>
                </div>

                {/* Status Dropdown */}
                <div className="relative">
                  <label className="block text-xs font-medium text-slate-500 mb-1">Status*</label>
                  <select 
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm font-medium bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 appearance-none"
                  >
                    <option value="New">New</option>
                    <option value="Active">Active</option>
                    <option value="Hold">Hold</option>
                    <option value="Closed">Closed</option>
                  </select>
                  <div className="absolute right-3 top-8 pointer-events-none text-slate-500 text-xs">▼</div>
                </div>

                {/* Last Modify Date Row field */}
                <div className="relative">
                  <label className="block text-xs font-medium text-slate-500 mb-1">Last modify date*</label>
                  <div className="relative">
                    <input 
                      type="date" disabled={modalMode === 'add'}
                      value={formData.modified}
                      onChange={(e) => setFormData({...formData, modified: e.target.value})}
                      className="w-full border border-slate-200 bg-slate-50/50 text-slate-500 rounded-md px-3 py-2 text-sm font-medium focus:outline-none cursor-not-allowed"
                    />
                  </div>
                </div>

                {/* Create Date Field */}
                <div className="relative md:col-span-1">
                  <label className="block text-xs font-medium text-slate-500 mb-1">Create date*</label>
                  <div className="relative">
                    <input 
                      type="date" disabled={modalMode === 'add'}
                      value={formData.created}
                      onChange={(e) => setFormData({...formData, created: e.target.value})}
                      className="w-full border border-slate-200 bg-slate-50/50 text-slate-500 rounded-md px-3 py-2 text-sm font-medium focus:outline-none cursor-not-allowed"
                    />
                  </div>
                </div>

              </div>

              {/* Form Actions Footer Row */}
              <div className="flex items-center gap-3 pt-2 border-t border-slate-100 justify-start">
                <button 
                  type="submit"
                  className="px-6 py-2 bg-indigo-600 text-white font-semibold text-sm rounded-md hover:bg-indigo-700 transition-colors shadow-sm"
                >
                  Save
                </button>
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2 bg-rose-700 text-white font-semibold text-sm rounded-md hover:bg-rose-800 transition-colors shadow-sm"
                >
                  Cancel
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};

export default MyProjects;