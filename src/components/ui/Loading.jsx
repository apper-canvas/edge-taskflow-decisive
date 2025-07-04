import { motion } from 'framer-motion'

const Loading = ({ type = 'default' }) => {
  if (type === 'tasks') {
    return (
      <div className="space-y-4">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 bg-gray-200 rounded shimmer"></div>
                <div className="space-y-2">
                  <div className="w-40 h-4 bg-gray-200 rounded shimmer"></div>
                  <div className="w-24 h-3 bg-gray-200 rounded shimmer"></div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-16 h-6 bg-gray-200 rounded-full shimmer"></div>
                <div className="w-6 h-6 bg-gray-200 rounded shimmer"></div>
              </div>
            </div>
            <div className="mt-4 w-full h-3 bg-gray-200 rounded shimmer"></div>
          </motion.div>
        ))}
      </div>
    )
  }

  if (type === 'categories') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-200 rounded-lg shimmer"></div>
                <div className="w-20 h-5 bg-gray-200 rounded shimmer"></div>
              </div>
              <div className="w-8 h-6 bg-gray-200 rounded-full shimmer"></div>
            </div>
            <div className="space-y-2">
              <div className="w-full h-3 bg-gray-200 rounded shimmer"></div>
              <div className="w-3/4 h-3 bg-gray-200 rounded shimmer"></div>
            </div>
          </motion.div>
        ))}
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full"
      />
    </div>
  )
}

export default Loading