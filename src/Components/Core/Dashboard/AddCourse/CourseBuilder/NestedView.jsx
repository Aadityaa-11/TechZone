import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { RxDropdownMenu } from "react-icons/rx"
import { MdEdit } from "react-icons/md"
import { RiDeleteBin6Line } from "react-icons/ri"
import { BiDownArrow } from "react-icons/bi"
import { AiOutlinePlus } from "react-icons/ai"

const NestedView = () => {
  const {Course} = useSelector( (state) => state.Course)

  const[AddSubSection , setAddSubSection] = useState(null)
  const[ViewSubSection , setViewSubSection] = useState(null)
  const[EditSubSection , setEditSubSection] = useState(null)

  return (
    <div>
        <div>
          {
            Course?.CourseContent?.map( (section) => {
              <details>

                  <summary>
                      <div>
                          <RxDropdownMenu/>
                      </div>
                  </summary>
              </details>
            })
          }

        </div>
      
    </div>
  )
}

export default NestedView
