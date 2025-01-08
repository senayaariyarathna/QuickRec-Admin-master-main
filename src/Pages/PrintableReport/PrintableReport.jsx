
import React, { useEffect }from 'react';

import waterBoardLogo from './Water-Board-Logo.png';
import nationalLogo from './EmblemSriLanka1.png';
import { useGetAllApplicantsDetailsQuery } from "../../state/api";


const PrintableReport = () => {
  // Get vacancy data from sessionStorage
  const printData = JSON.parse(sessionStorage.getItem('printVacancyData') || '{}');
  const vacancyId = printData.vacancyId;
  console.log("Vacancy ID from session:", vacancyId); // Debug log

  // Query for applicants data
  const { data, error, isLoading } = useGetAllApplicantsDetailsQuery(
    vacancyId ? { vacancyId } : undefined
  );

  console.log("API Response:", data); // Debug log

  // Clear the session storage after getting the data
  useEffect(() => {
    if (data) {
      sessionStorage.removeItem('printVacancyData');
    }
  }, [data]);

  
  // Function to handle printing the report
  // Temporarily replaces the document body content with the printable area
  const handlePrint = () => {
    const printContents = document.getElementById('printableArea').innerHTML;
    const originalContents = document.body.innerHTML;
  
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();
  };
  
    // Inline styles
    const styles = {
      reportContainer: {
        padding: '20px',
        maxWidth: '100%',
        margin: '0 auto',
        // marginLeft :'20px',

      },
      reportHeader: {
        textAlign: 'center',
        marginBottom: '20px',
      },
      reportLogo: {
        maxWidth: '400px',
        height: 'auto',
        margin: '20px',
        marginTop: '20px'
      },
      nationalLogo: {
        maxWidth: '60px',
        height: 'auto',
        marginTop: '10px',
        marginBottom: '20px'
      },

      reportTitle: {
        textAlign: 'left',
        margin: '20px 0',
        fontSize: '20px',
      },
      reportTableContainer: {
        overflowX: 'auto',
        marginBottom: '2px',
        

      },
      reportTable: {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '10px',
       
      },
      tableCell: {
        border: '1px solid #ddd',
        padding: '8px',
        textAlign: 'left',
      },
      tableHeader: {
        backgroundColor: '#f5f5f5',
      },
      mainHeader: {
        backgroundColor: '#e0e0e0',
        fontWeight: 'bold',

      },
      mainHeader1:{
        width:'50px',
        backgroundColor: '#e0e0e0',
        fontWeight: 'bold',

      },
      printButton: {
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginTop: '20px',
        marginLeft: '15px'
      },
     
      
    };

    // Display loading or error messages if data isn't available
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>No Applicants  {error.message}</div>;
  if (!vacancyId) return <div>Please select a vacancy first</div>;

  //Handle cases where data is not an array
  // const applicants = Array.isArray(data?.data) ? data.data : [];
  const applicants = data?.data || [];
 
    return (
    <>
    <div id="printableArea" style={styles.reportContainer}>
      {/* logo */}
      <div style={styles.reportHeader}>
        <img
          src={waterBoardLogo}
          alt="National Water Supply & Drainage Board Logo"
          style={styles.reportLogo}
        />
        <img
          src={nationalLogo}
          alt="National Logo"
          style={styles.nationalLogo}
        />
        
      </div>

      <h1 style={styles.reportTitle}>
        {vacancyId ? `Applicants for ${data?.vacancyName || 'Selected Vacancy'}` : 'All Job Applicants'}
      </h1>

      {/* Main table */}
      <div style={styles.reportTableContainer}>
        <table style={styles.reportTable}>
          <thead>
            <tr>
              <th colSpan="7" style={styles.mainHeader}>
                Basic Details
              </th>
              <th colSpan="2" style={styles.mainHeader}>
                Education Qualifications
              </th>
              <th style={styles.mainHeader}>Professional Experience</th>
              <th style={styles.mainHeader}>Other Achievements</th>
              <th colSpan="2" style={styles.mainHeader1}>Marks</th>
            </tr>
            <tr>
              <th style={styles.tableCell}>Name</th>
              <th style={styles.tableCell}>NIC Number</th>
              <th style={styles.tableCell}>Sex</th>
              <th style={styles.tableCell}>Civil Status</th>
              <th style={styles.tableCell}>Date of Birth</th>
              <th style={styles.tableCell}>Mobile No</th>
              <th style={styles.tableCell}>Address</th>
              <th style={styles.tableCell}>Name of the University</th>
              <th style={styles.tableCell}>Degree</th>
              <th style={styles.tableCell}></th>
              <th style={styles.tableCell}></th>
              <th style={styles.tableCell}></th>
            </tr>
          </thead>

          


         {/* Table body */}
         <tbody>
          {Object.values(applicants.reduce((acc, item) => {
          // If this user hasn't been processed yet, create a new entry
           if (!acc[item.UserId]) {
            acc[item.UserId] = {
            personalDetails: {
            NameWithInitials: item.NameWithInitials,
            NIC: item.NIC,
            Sex: item.Sex,
            CivilStatus: item.CivilStatus,
            DateOfBirth: item.DateOfBirth,
            MobileNo1: item.MobileNo1,
            AddressLine1: item.AddressLine1,
            UserId: item.UserId
         },
         educationDetails: []
      };
    }
    
           // Add education details
           acc[item.UserId].educationDetails.push({
           instituteName: item.instituteName,
           fieldOfStudy: item.fieldOfStudy
    });
    
    return acc;
  }, {})).map(user => {
    const rowSpan = Math.max(1, user.educationDetails.length);
    
    return user.educationDetails.map((edu, index) => (
      <tr key={`${user.personalDetails.UserId}-${index}`}>
        {/* Show personal details only in first row */}
        {index === 0 && (
          <>
            <td style={styles.tableCell} rowSpan={rowSpan}>{user.personalDetails.NameWithInitials}</td>
            <td style={styles.tableCell} rowSpan={rowSpan}>{user.personalDetails.NIC}</td>
            <td style={styles.tableCell} rowSpan={rowSpan}>{user.personalDetails.Sex}</td>
            <td style={styles.tableCell} rowSpan={rowSpan}>{user.personalDetails.CivilStatus}</td>
            <td style={styles.tableCell} rowSpan={rowSpan}>{user.personalDetails.DateOfBirth}</td>
            <td style={styles.tableCell} rowSpan={rowSpan}>{user.personalDetails.MobileNo1}</td>
            <td style={styles.tableCell} rowSpan={rowSpan}>{user.personalDetails.AddressLine1}</td>
          </>
        )}
        {/* Education details */}
        <td style={styles.tableCell}>{edu.instituteName || ''}</td>
        <td style={styles.tableCell}>{edu.fieldOfStudy || ''}</td>
        <td style={styles.tableCell}>{}</td>
        <td style={styles.tableCell}>{/* Other achievements */}</td>
        <td style={styles.tableCell}>{/* Marks */}</td>
      </tr>
    ));
  })}
      </tbody>



        </table>
      </div>
      </div>
      {/* Print button */}
      <button onClick={handlePrint} style={styles.printButton}>
        Print Report
      </button>
    
      
      </>
  );
};

export default PrintableReport;


