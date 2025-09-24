#!/bin/bash

# Replace Preclinic with Symplify in all remaining files

# Patient modules
sed -i 's/Preclinic/Symplify/g' "src/feature-module/components/pages/patient-modules/patient-invoice-details/patientInvoiceDetails.tsx"
sed -i 's/Preclinic/Symplify/g' "src/feature-module/components/pages/patient-modules/patient-password-settings/patientPasswordSettings.tsx"
sed -i 's/Preclinic/Symplify/g' "src/feature-module/components/pages/patient-modules/patient-appointment-details/patientAppointmentDetails.tsx"
sed -i 's/Preclinic/Symplify/g' "src/feature-module/components/pages/patient-modules/patient-prescriptions/patientPrescriptions.tsx"
sed -i 's/Preclinic/Symplify/g' "src/feature-module/components/pages/patient-modules/patient-appointments/patientAppointments.tsx"
sed -i 's/Preclinic/Symplify/g' "src/feature-module/components/pages/patient-modules/patient-invoices/patientInvoices.tsx"
sed -i 's/Preclinic/Symplify/g' "src/feature-module/components/pages/patient-modules/patient-profile-settings/patientProfileSettings.tsx"
sed -i 's/Preclinic/Symplify/g' "src/feature-module/components/pages/patient-modules/patient-doctors/patientDoctors.tsx"
sed -i 's/Preclinic/Symplify/g' "src/feature-module/components/pages/patient-modules/patient-prescription-details/patientPrescriptionDetails.tsx"
sed -i 's/Preclinic/Symplify/g' "src/feature-module/components/pages/patient-modules/patient-notifications-settings/patientNotificationsSettings.tsx"

# Clinic modules
sed -i 's/Preclinic/Symplify/g' "src/feature-module/components/pages/clinic-modules/edit-doctor/editDoctor.tsx"
sed -i 's/Preclinic/Symplify/g' "src/feature-module/components/pages/clinic-modules/appointments/appointments.tsx"
sed -i 's/Preclinic/Symplify/g' "src/feature-module/components/pages/clinic-modules/specializations/specializations.tsx"
sed -i 's/Preclinic/Symplify/g' "src/feature-module/components/pages/clinic-modules/edit-patient/editPatient.tsx"
sed -i 's/Preclinic/Symplify/g' "src/feature-module/components/pages/clinic-modules/patients/patients.tsx"
sed -i 's/Preclinic/Symplify/g' "src/feature-module/components/pages/clinic-modules/doctors/doctors.tsx"
sed -i 's/Preclinic/Symplify/g' "src/feature-module/components/pages/clinic-modules/create-patient/createPatient.tsx"
sed -i 's/Preclinic/Symplify/g' "src/feature-module/components/pages/clinic-modules/appointment-consultations/appointmentConsultations.tsx"
sed -i 's/Preclinic/Symplify/g' "src/feature-module/components/pages/clinic-modules/patient-details/patientDetails.tsx"
sed -i 's/Preclinic/Symplify/g' "src/feature-module/components/pages/clinic-modules/activities/activities.tsx"
sed -i 's/Preclinic/Symplify/g' "src/feature-module/components/pages/clinic-modules/assets/assets.tsx"
sed -i 's/Preclinic/Symplify/g' "src/feature-module/components/pages/clinic-modules/add-doctor/addDoctor.tsx"
sed -i 's/Preclinic/Symplify/g' "src/feature-module/components/pages/clinic-modules/appointment-calendar/appointmentCalendar.tsx"
sed -i 's/Preclinic/Symplify/g' "src/feature-module/components/pages/clinic-modules/doctors-list/doctorsList.tsx"
sed -i 's/Preclinic/Symplify/g' "src/feature-module/components/pages/clinic-modules/patients-grid/patientsGrid.tsx"
sed -i 's/Preclinic/Symplify/g' "src/feature-module/components/pages/clinic-modules/doctor-details/doctorDetails.tsx"
sed -i 's/Preclinic/Symplify/g' "src/feature-module/components/pages/clinic-modules/services/services.tsx"
sed -i 's/Preclinic/Symplify/g' "src/feature-module/components/pages/clinic-modules/locations/locations.tsx"

# HRM modules
sed -i 's/Preclinic/Symplify/g' "src/feature-module/components/pages/hrm-modules/payrollTwo.tsx"
sed -i 's/Preclinic/Symplify/g' "src/feature-module/components/pages/hrm-modules/attendance.tsx"
sed -i 's/Preclinic/Symplify/g' "src/feature-module/components/pages/hrm-modules/designation.tsx"
sed -i 's/Preclinic/Symplify/g' "src/feature-module/components/pages/hrm-modules/leaves/leavesList.tsx"
sed -i 's/Preclinic/Symplify/g' "src/feature-module/components/pages/hrm-modules/staffs.tsx"
sed -i 's/Preclinic/Symplify/g' "src/feature-module/components/pages/hrm-modules/payroll.tsx"
sed -i 's/Preclinic/Symplify/g' "src/feature-module/components/pages/hrm-modules/hrmDepartments.tsx"

echo "Replacement complete for component files"
