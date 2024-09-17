"use client"
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin, { Draggable } from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon, ExclamationTriangleIcon } from '@heroicons/react/20/solid'

export default function Home() {
  const [eventos, setEventos] = useState([
    { title: 'evento 1', id: '1' },
    { title: 'evento 2', id: '2' },
    { title: 'evento 3', id: '3' },
    { title: 'evento 4', id: '4' },
    { title: 'evento 5', id: '5' },
  ])
  const [todosEventos, setTodosEventos] = useState([])
  const [mostrarModal, setMostrarModal] = useState(false)
  const [mostrarModalDeletar, setMostrarModalDeletar] = useState(false)
  const [idParaDeletar, setIdParaDeletar] = useState(null)
  const [novoEvento, setNovoEvento] = useState({
    title: '',
    start: '',
    allDay: false,
    id: 0
  })

  useEffect(() => {
    let elementoArrastavel = document.getElementById('elemento-arrastavel')
    if (elementoArrastavel) {
      new Draggable(elementoArrastavel, {
        itemSelector: ".fc-event",
        eventData: function (eventEl) {
          let title = eventEl.getAttribute("title")
          let id = eventEl.getAttribute("data")
          let start = eventEl.getAttribute("start")
          return { title, id, start }
        }
      })
    }
  }, [])

  function handleDateClick(arg) {
    setNovoEvento({ ...novoEvento, start: arg.date, allDay: arg.allDay, id: new Date().getTime() })
    setMostrarModal(true)
  }

  function adicionarEvento(data) {
    const evento = { ...novoEvento, start: data.date.toISOString(), title: data.draggedEl.innerText, allDay: data.allDay, id: new Date().getTime() }
    setTodosEventos([...todosEventos, evento])
  }

  function abrirModalDeletar(data) {
    setMostrarModalDeletar(true)
    setIdParaDeletar(Number(data.event.id))
  }

  function deletarEvento() {
    setTodosEventos(todosEventos.filter(evento => Number(evento.id) !== Number(idParaDeletar)))
    setMostrarModalDeletar(false)
    setIdParaDeletar(null)
  }

  function fecharModal() {
    setMostrarModal(false)
    setNovoEvento({
      title: '',
      start: '',
      allDay: false,
      id: 0
    })
    setMostrarModalDeletar(false)
    setIdParaDeletar(null)
  }

  const handleChange = (e) => {
    setNovoEvento({
      ...novoEvento,
      title: e.target.value
    })
  }

  function handleSubmit(e) {
    e.preventDefault()
    setTodosEventos([...todosEventos, novoEvento])
    setMostrarModal(false)
    setNovoEvento({
      title: '',
      start: '',
      allDay: false,
      id: 0
    })
  }

  return (
    <>
      <nav className="flex justify-between mb-12 border-b border-violet-100 p-4">
        <h1 className="font-bold text-2xl text-gray-700">Calendário</h1>
      </nav>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="grid grid-cols-10">
          <div className="col-span-8">
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'resourceTimelineWook, dayGridMonth,timeGridWeek'
              }}
              events={todosEventos}
              nowIndicator={true}
              editable={true}
              droppable={true}
              selectable={true}
              selectMirror={true}
              dateClick={handleDateClick}
              drop={(data) => adicionarEvento(data)}
              eventClick={(data) => abrirModalDeletar(data)}
            />
          </div>
          <div id="elemento-arrastavel" className="ml-8 w-full border-2 p-2 rounded-md mt-16 lg:h-1/2 bg-violet-50">
            <h1 className="font-bold text-lg text-center">Arraste o Evento</h1>
            {eventos.map(evento => (
              <div
                className="fc-event border-2 p-1 m-2 w-full rounded-md ml-auto text-center bg-white"
                title={evento.title}
                key={evento.id}
              >
                {evento.title}
              </div>
            ))}
          </div>
        </div>

        {/* Modal Deletar */}
        <Transition.Root show={mostrarModalDeletar} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={setMostrarModalDeletar}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                      <div className="sm:flex sm:items-start">
                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                          <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                        </div>
                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                          <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                            Deletar Evento
                          </Dialog.Title>
                          <div className="mt-2">
                            <p className="text-sm text-gray-500">
                              Tem certeza de que deseja deletar este evento?
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <button type="button" className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto" onClick={deletarEvento}>
                        Deletar
                      </button>
                      <button type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        onClick={fecharModal}
                      >
                        Cancelar
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Modal Adicionar Evento */}
        <Transition.Root show={mostrarModal} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={setMostrarModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                      <div className="sm:flex sm:items-start">
                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                          <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                        </div>
                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                          <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                            Adicionar Evento
                          </Dialog.Title>
                          <div className="mt-2">
                            <form onSubmit={handleSubmit}>
                              <input
                                value={novoEvento.title}
                                onChange={handleChange}
                                required
                                type="text"
                                name="title"
                                className="w-full border-2 border-violet-300 p-2 mt-2 rounded-md"
                                placeholder="Nome do Evento"
                              />
                              <button
                                type="submit"
                                className="w-full rounded-md bg-green-600 text-white p-2 mt-4 hover:bg-green-500"
                              >
                                Adicionar Evento
                              </button>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <button type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        onClick={fecharModal}
                      >
                        Cancelar
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      </main>
    </>
  )
}
