// import React, { useState, useEffect } from 'react';
// // import usersData from './users.json';
// import waterBoardLogo from './Water-Board-Logo.png';

// const fetchData = () => {
//   return new Promise((resolve) => {
//     // Simulate API call with JSON data
//     setTimeout(() => {
//       resolve(usersData.applicants);
//     }, 1000);
//   });
// };



// const PrintableReport = () => {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     fetchData().then(setData);
//   }, []);

//   const handlePrint = () => {
//     window.print();
//   };

//   // Inline styles
//   const styles = {
//     reportContainer: {
//       padding: '20px',
//       maxWidth: '100%',
//       margin: '0 auto',
//     },
//     reportHeader: {
//       textAlign: 'center',
//       marginBottom: '20px',
//     },
//     reportLogo: {
//       maxWidth: '600px',
//       height: 'auto',
//     },
//     reportTitle: {
//       textAlign: 'left',
//       margin: '20px 0',
//     },
//     reportTableContainer: {
//       overflowX: 'auto',
//       marginBottom: '20px',
//     },
//     reportTable: {
//       width: '100%',
//       borderCollapse: 'collapse',
//       marginTop: '20px',
//     },
//     tableCell: {
//       border: '1px solid #ddd',
//       padding: '8px',
//       textAlign: 'left',
//     },
//     tableHeader: {
//       backgroundColor: '#f5f5f5',
//     },
//     mainHeader: {
//       backgroundColor: '#e0e0e0',
//       fontWeight: 'bold',
//     },
//     printButton: {
//       padding: '10px 20px',
//       backgroundColor: '#007bff',
//       color: 'white',
//       border: 'none',
//       borderRadius: '4px',
//       cursor: 'pointer',
//       marginTop: '20px',
//     },
//   };

//   return (
//     <div style={styles.reportContainer}>
//       {/* logo */}
//       <div style={styles.reportHeader}>
//         <img
//           src={waterBoardLogo}
//           alt="National Water Supply & Drainage Board Logo"
//           style={styles.reportLogo}
//         />
//       </div>

//       <h1 style={styles.reportTitle}>Job Applicants</h1>

//       {/* Main table */}
//       <div style={styles.reportTableContainer}>
//         <table style={styles.reportTable}>
//           <thead>
//             <tr>
//               <th colSpan="7" style={styles.mainHeader}>
//                 Basic Details
//               </th>
//               <th colSpan="2" style={styles.mainHeader}>
//                 Education Qualifications
//               </th>
//               <th style={styles.mainHeader}>Professional Experience</th>
//               <th style={styles.mainHeader}>Other Achievements</th>
//               <th style={styles.mainHeader}>Marks</th>
//             </tr>
//             <tr>
//               <th style={styles.tableCell}>Name</th>
//               <th style={styles.tableCell}>NIC Number</th>
//               <th style={styles.tableCell}>Sex</th>
//               <th style={styles.tableCell}>Civil Status</th>
//               <th style={styles.tableCell}>Date of Birth</th>
//               <th style={styles.tableCell}>Mobile No</th>
//               <th style={styles.tableCell}>Address</th>
//               <th style={styles.tableCell}>Name of the University</th>
//               <th style={styles.tableCell}>Degree</th>
//               <th style={styles.tableCell}></th>
//               <th style={styles.tableCell}></th>
//               <th style={styles.tableCell}></th>
//             </tr>
//           </thead>

//           {/* Table body */}
//           <tbody>
//             {data.map((item, index) => (
//               <tr key={index}>
//                 <td style={styles.tableCell}>{item.basicDetails.name}</td>
//                 <td style={styles.tableCell}>{item.basicDetails.nicNumber}</td>
//                 <td style={styles.tableCell}>{item.basicDetails.sex}</td>
//                 <td style={styles.tableCell}>{item.basicDetails.civilStatus}</td>
//                 <td style={styles.tableCell}>{item.basicDetails.dateOfBirth}</td>
//                 <td style={styles.tableCell}>{item.basicDetails.mobileNo}</td>
//                 <td style={styles.tableCell}>{item.basicDetails.address}</td>
//                 <td style={styles.tableCell}>
//                   {item.educationQualifications[0]?.university || ''}
//                 </td>
//                 <td style={styles.tableCell}>
//                   {item.educationQualifications[0]?.degree || ''}
//                 </td>
//                 <td style={styles.tableCell}>{item.professionalQualification}</td>
//                 <td style={styles.tableCell}>{item.otherAchievements}</td>
//                 <td style={styles.tableCell}>{item.marks}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Print button */}
//       <button onClick={handlePrint} style={styles.printButton}>
//         Print Report
//       </button>
//     </div>
//   );
// };

// export default PrintableReport;

//.....................................................................
import React from 'react';
import waterBoardLogo from './Water-Board-Logo.png';
import { useApplicantsDetailsQuery } from "../../state/api";

const PrintableReport = () => {
  const userId = 7; // Replace with dynamic userId if needed
  const { data, error, isLoading } = useApplicantsDetailsQuery({ userId });

  const handlePrint = () => {
    window.print();
  };

  // Inline styles
  const styles = {
    reportContainer: {
      padding: '20px',
      maxWidth: '100%',
      margin: '0 auto',
    },
    reportHeader: {
      textAlign: 'center',
      marginBottom: '20px',
    },
    reportLogo: {
      maxWidth: '600px',
      height: 'auto',
    },
    reportTitle: {
      textAlign: 'left',
      margin: '20px 0',
    },
    reportTableContainer: {
      overflowX: 'auto',
      marginBottom: '20px',
    },
    reportTable: {
      width: '100%',
      borderCollapse: 'collapse',
      marginTop: '20px',
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
    printButton: {
      padding: '10px 20px',
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      marginTop: '20px',
    },
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // Handle cases where `data` is not an array
  const applicants = Array.isArray(data) ? data : [data];

  return (
    <div style={styles.reportContainer}>
      {/* logo */}
      <div style={styles.reportHeader}>
        <img
          src={waterBoardLogo}
          alt="National Water Supply & Drainage Board Logo"
          style={styles.reportLogo}
        />
      </div>

      <h1 style={styles.reportTitle}>Job Applicants</h1>

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
              <th style={styles.mainHeader}>Marks</th>
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
            {applicants.map((item, index) => (
              <tr key={index}>
                <td style={styles.tableCell}>{item.basicDetails?.name}</td>
                <td style={styles.tableCell}>{item.basicDetails?.nicNumber}</td>
                <td style={styles.tableCell}>{item.basicDetails?.sex}</td>
                <td style={styles.tableCell}>{item.basicDetails?.civilStatus}</td>
                <td style={styles.tableCell}>{item.basicDetails?.dateOfBirth}</td>
                <td style={styles.tableCell}>{item.basicDetails?.mobileNo}</td>
                <td style={styles.tableCell}>{item.basicDetails?.address}</td>
                <td style={styles.tableCell}>
                  {item.educationQualifications?.[0]?.university || ''}
                </td>
                <td style={styles.tableCell}>
                  {item.educationQualifications?.[0]?.degree || ''}
                </td>
                <td style={styles.tableCell}>{item.professionalQualification}</td>
                <td style={styles.tableCell}>{item.otherAchievements}</td>
                <td style={styles.tableCell}>{item.marks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Print button */}
      <button onClick={handlePrint} style={styles.printButton}>
        Print Report
      </button>
    </div>
  );
};

export default PrintableReport;


