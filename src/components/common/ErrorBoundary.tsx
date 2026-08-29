import { Component, ErrorInfo, ReactNode } from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'
import { motion } from 'framer-motion'

interface Props {
  children?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  }

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in React component tree:', error, errorInfo)
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null })
    window.location.hash = '/' // Reset to home
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className='min-h-[400px] h-full w-full flex items-center justify-center p-6 bg-primary-50 dark:bg-dark-bg'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className='max-w-md w-full bg-white dark:bg-dark-card rounded-2xl shadow-xl p-8 text-center border border-primary-100 dark:border-dark-border'
          >
            <div className='w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6'>
              <AlertTriangle className='w-8 h-8 text-red-600 dark:text-red-500' />
            </div>

            <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-2'>
              Đã xảy ra sự cố
            </h2>

            <p className='text-gray-600 dark:text-gray-400 mb-6 text-sm'>
              Rất tiếc, giao diện ứng dụng gặp lỗi trong quá trình hiển thị. Bạn có thể tải lại
              trang hoặc quay về trang chủ.
            </p>

            {this.state.error && (
              <div className='mb-6 text-left p-3 bg-gray-50 dark:bg-dark-bg rounded-lg border border-gray-200 dark:border-dark-border overflow-x-auto'>
                <code className='text-xs text-red-600 dark:text-red-400 font-mono whitespace-pre'>
                  {this.state.error.toString()}
                </code>
              </div>
            )}

            <button
              onClick={this.handleReset}
              className='w-full flex items-center justify-center gap-2 py-3 px-4 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-medium transition-colors'
            >
              <RefreshCw className='w-5 h-5' />
              <span>Tải lại trang chủ</span>
            </button>
          </motion.div>
        </div>
      )
    }

    return this.props.children
  }
}
