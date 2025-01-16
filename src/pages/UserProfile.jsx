import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Button,
  Card,
  CardBody,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Typography,
} from '@material-tailwind/react';
import {
  FaUserEdit,
  FaCamera,
  FaSave,
  FaTimes,
  FaEnvelope,
  FaClock,
  FaUser
} from 'react-icons/fa';
import useAuth from '../hooks/useAuth';

const UserProfile = () => {
  const { user } = useAuth();
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.displayName || '',
    profilePic: user?.photoURL || ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdate = () => {
    // Update logic here
    console.log('Updated Profile:', formData);
    setIsUpdateModalOpen(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto p-4"
    >
      <Card className="shadow-lg">
        <CardBody>
          {/* Profile Display Section */}
          <div className="flex flex-col items-center space-y-6">
            {/* Profile Picture */}
            <div className="relative">
              <img
                src={user?.photoURL || 'https://via.placeholder.com/150'}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-2 border-gray-200"
              />
            </div>

            {/* User Information */}
            <div className="text-center space-y-2">
              <Typography variant="h4" color="blue-gray">
                {user?.displayName || 'User Name'}
              </Typography>
              
              <div className="flex items-center justify-center gap-2">
                <FaEnvelope className="text-blue-gray-400" />
                <Typography color="blue-gray">
                  {user?.email || 'email@example.com'}
                </Typography>
              </div>

              <div className="flex items-center justify-center gap-2">
                <FaClock className="text-blue-gray-400" />
                <Typography color="blue-gray" className="text-sm">
                  Last login: {user?.metadata?.lastSignInTime
                    ? new Date(user.metadata.lastSignInTime).toLocaleString()
                    : 'Not Available'}
                </Typography>
              </div>
            </div>

            {/* Edit Button */}
            <Button
              variant="outlined"
              color="blue-gray"
              className="flex items-center gap-2"
              onClick={() => setIsUpdateModalOpen(true)}
            >
              <FaUserEdit className="h-4 w-4" />
              Update Profile
            </Button>
          </div>
        </CardBody>
      </Card>

      {/* Update Profile Modal */}
      <Dialog
        size="md"
        open={isUpdateModalOpen}
        handler={() => setIsUpdateModalOpen(false)}
      >
        <DialogHeader>Update Profile</DialogHeader>
        <DialogBody divider className="space-y-4">
          {/* Profile Picture Update */}
          <div className="space-y-2">
            <Typography variant="small" color="blue-gray" className="font-medium">
              Profile Picture URL
            </Typography>
            <Input
              name="profilePic"
              value={formData.profilePic}
              onChange={handleInputChange}
              placeholder="Enter image URL"
              icon={<FaCamera />}
              className="!border-t-blue-gray-200 focus:!border-t-blue-500"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>

          {/* Name Update */}
          <div className="space-y-2">
            <Typography variant="small" color="blue-gray" className="font-medium">
              Display Name
            </Typography>
            <Input
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your name"
              icon={<FaUser />}
              className="!border-t-blue-gray-200 focus:!border-t-blue-500"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button
            variant="outlined"
            color="red"
            onClick={() => setIsUpdateModalOpen(false)}
            className="flex items-center gap-2"
          >
            <FaTimes className="h-4 w-4" />
            Cancel
          </Button>
          <Button
            color="green"
            onClick={handleUpdate}
            className="flex items-center gap-2"
          >
            <FaSave className="h-4 w-4" />
            Save Changes
          </Button>
        </DialogFooter>
      </Dialog>
    </motion.div>
  );
};

export default UserProfile;